const express = require("express");
const mongoose = require("mongoose");
// const raceResults = require('./models/RaceResult');
const Teams = require('./models/Team');
const WDC = require('./models/WDC');
const WCC = require('./models/WCC');
const Drivers = require('./models/Driver');
// const RaceHistory = require('./models/RaceResult');
const PracticeHistory = require('./models/PracticeResult');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const passport = require('./config/passport');
const flash = require('connect-flash');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors({
//   origin: ["http://localhost:8080", "http://localhost:3000"],
//   credentials: true
// }));
app.use(express.json());
if (process.env.NODE_ENV === "production") { 
    app.use(express.static("client/build")); 
}
else {
    app.use(express.static("public"));
}

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/narl", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(require('./routes/DriverRoutes.js'));
app.use(require('./routes/TeamRoutes.js'));
app.use(require('./routes/UserRoutes.js'));
app.use(require('./routes/ChampRoutes.js'));
app.use(require('./routes/PracticeRoutes.js'));
app.use(require('./routes/TrackRoutes.js'));
app.use(require('./routes/EntryListRoutes'));
app.use(require('./routes/ACRoutes'));
app.use(require('./routes/SeasonRoutes'));
app.use(require('./routes/WeekendRoutes'));
app.use(require('./routes/QualyRoutes'));
app.use(require('./routes/RaceRoutes'));

// routes

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.get('/api/clearPractice', async (req, res) => {
  const drivers = await Drivers.find({});
  console.log(drivers)
  const clearedPractice = await PracticeTable.deleteMany({});
  console.log('cleared')

  drivers.forEach(async (driver) => {
    console.log(driver.team);
    let team = driver.team
    let tmpEntry = {
      driverName: driver.name,
      rawLapTime: 999999999,
      teamName: team,
      driverID: driver._id,
      tire: "",
      laps: 0
    };

    const newEntry = await PracticeTable.create(tmpEntry);
  })

});

app.put('/api/updatePractice', async (req, res) => {
  const practiceDir = __dirname + '/Results/Practice/FujiS2';

  fs.readdir(practiceDir, async (err, files) => {
    const practiceHistory = PracticeHistory.find({});
    files = files.sort();


    files.forEach(async file => {
      const fileInServer = await PracticeHistory.findOne({ fileName: file });
      if (fileInServer) {
        console.log('file is in server');
      }
      else {
        let rawdata = fs.readFileSync(path.resolve(practiceDir, file));
        rawdata = JSON.parse(rawdata);
        const practiceResults = rawdata.Result;
        const practiceLaps = rawdata.Laps;
        practiceLaps.forEach(async (lap) => {
          let updatedCDriver = await Drivers.findOneAndUpdate({name: lap.DriverName}, {$inc : {careerLaps: 1}});
          let updatedPDriver = await PracticeTable.findOneAndUpdate({driverName: lap.DriverName}, {$inc: {laps: 1}});
        })

        let updatedDriver;

        practiceResults.forEach(async (driver) => {
         
          if (driver.BestLap === 999999999) {
            return;
          }
          const driverInDB = await PracticeTable.findOne({ driverName: driver.DriverName });

          if(driver.BestLap < driverInDB.rawLapTime){
            let updatedDriver = await PracticeTable.findOneAndUpdate({driverName: driver.DriverName}, {$set: {rawLapTime: driver.BestLap}});
            practiceLaps.forEach(async (lap) => {
              if(lap.LapTime === driver.BestLap){
                let updatedTire = await PracticeTable.findOneAndUpdate({driverName: driver.DriverName}, {$set: {tire: lap.Tyre}});
              }
            })
          }
        })
      }
    })
  });
})

//get practice results
app.get('/api/practiceResults', async (req, res) => {
    const practiceResults = await PracticeTable.find({}).sort({rawLapTime: 1});

    res.send(practiceResults);
})

// get all drivers
app.get('/api/allDrivers', async (req, res) => {
  const drivers = await Drivers.find({});

  res.send(drivers);
})

// get filterd drivers 
app.get('/api/drivers/:driverName', async (req, res) => {
  const driverName = req.params.driverName;
  console.log(driverName);
  const filterd = await Drivers.find({ name: { $regex: driverName } });
  res.send(filterd);
})

// get team by name
app.get('/api/teams/:team', (req, res) => {
  let team = req.params.team;
  console.log(team);
  if (team.includes('%20')) {
    team.split('%20');
    team.join(" ")
  }
  Teams.findOne({ name: team })
    .then(team => res.send(team));
})

// get most recent race and add points
app.get('/api/lastRace', (req, res) => {
  const raceDir = __dirname + '/results/Race';
  fs.readdir(raceDir, async (err, files) => {
    const raceHistory = RaceHistory.find({});
    files = files.sort();
    const racePoints = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    files.forEach(async file => {
      const fileInServer = await RaceHistory.findOne({ fileName: file });
      if (fileInServer) {
        console.log('file is in server');
      }
      else {
        let rawdata = fs.readFileSync(path.resolve(raceDir, file));
        rawdata = JSON.parse(rawdata);
        const raceResults = rawdata.Result;
        let updatedDriver;
        let updatedTeam;
        // populate race points
        raceResults.forEach(async (driver, i) => {
          let driverPoints = 0;
          let driverCareerPoints = 0;
          let foundDriver = await Drivers.findOne({ name: driver.DriverName });
          if (i === 0) {
            let driverCareerWins = 0;
            let driverWins = 0;
            driverPoints = foundDriver.points + racePoints[i];
            driverCareerPoints = foundDriver.careerPoints + racePoints[i];
            driverCareerWins = foundDriver.careerWins + 1;
            driverWins = foundDriver.wins + 1;

            updatedDriver = await Drivers.findOneAndUpdate({ name: driver.DriverName },
              {
                $inc: {
                  points: racePoints[i],
                  wins: 1,
                  careerPoints: racePoints[i],
                  careerWins: 1
                }
              })
            updatedTeam = await Teams.findOneAndUpdate({ name: foundDriver.team },
              {
                $inc:
                {
                  points: racePoints[i],
                  wins: 1,
                  historyPoints: racePoints[i],
                  historyWins: 1
                }
              });
          }
          else {
            updatedDriver = await Drivers.findOneAndUpdate({ name: driver.DriverName }, { $inc: { points: racePoints[i], careerPoints: racePoints[i] } })
            updatedTeam = await Teams.findOneAndUpdate({ name: foundDriver.team },
              {
                $inc:
                {
                  points: racePoints[i],
                  historyPoints: racePoints[i],
                }
              });
          }

        })
        const laps = rawdata.Laps;
        let fastestLap = 99999999999999;
        let fastestDriver = "";
        let fd;
        laps.forEach(async (lap, i) => {
          if (lap.LapTime < fastestLap) {
            fastestLap = lap.LapTime;
            fastestDriver = lap.DriverName;
          }
        })
        console.log(fastestDriver)
        //fd = fastestDriver
        let driver = await Drivers.findOne({ name: fastestDriver });
        console.log(driver);
        updatedDriver = await Drivers.findOneAndUpdate({ name: fastestDriver }, { $inc: { fastestLaps: 1, careerFastestLaps: 1 } });
        updatedTeam = await Teams.findOneAndUpdate({ name: driver.team }, { $inc: { fastestLaps: 1, historyFastestLaps: 1 } });

      }
      const newRace = { fileName: file };
      const newEntry = RaceHistory.create(newRace);
    })

  })

})



app.get('/api/raceResults', (req, res) => {
  raceResults.find({})
    .then(races => res.send(races));
})

// get driver championship data
// app.get('/api/WDC', async (req, res) => {
//   const driverChamp = await WDC.find({});

//   driverChamp.forEach(async driver => {
//     const driverStats = await Drivers.findOne({ name: driver.name });

//     const updatedDriverChamp = await WDC.findOneAndUpdate({ name: driver.name }, { $set: { points: driverStats.points, wins: driverStats.wins, fastestLaps: driverStats.fastestLaps } });
//   })

//   const wdcToSend = await WDC.find({}).sort({ points: -1 });

//   res.send(wdcToSend);
// })

// get constructor champioship data
// app.get('/api/WCC', async (req, res) => {

//   const cChamp = await WCC.find({});


//   cChamp.forEach(async team => {
//     let teamStats = await Teams.findOne({ name: team.team });
//     let updatedWCC = await WCC.findOneAndUpdate({ team: teamStats.name }, {
//       $set: {
//         points: teamStats.points,
//         wins: teamStats.wins,
//         fastestLaps: teamStats.fastestLaps
//       }
//     })
//   })

//   const wccToSend = await WCC.find({}).sort({ 'points': -1 });
//   res.send(wccToSend);

// })

//get all drivers 

// append each driver to their teams driver array
app.put('/api/populateTeamDrivers', async (req, res) => {
  const drivers = await Drivers.find({});

  let driverCount = 0;
  drivers.forEach(async (driver, i) => {
    const team = await Teams.findOne({ name: driver.team });

    if (team.drivers.indexOf(driver.name) === -1) {
      const updatedTeam = await Teams.findOneAndUpdate({ _id: team._id }, { $push: { drivers: driver.name } }, { new: true });
    }
    driverCount += 1;
    //const updatedDriver = await Drivers.findByIdAndUpdate(driver._id, {$push: {teamHistory: _id}}, {new: true});
    //console.log(updatedDriver);
  })

})

// set team constructor points 
app.put('/api/setConstructors', async (req, res) => {
  const teams = await Teams.find({});
  const wccStandings = await WCC.find({});

  teams.forEach(async (team) => {
    team.drivers.forEach(async (driverName) => {
      const driver = await Drivers.findOne({ name: driverName });
      const updatedConstruct = await Teams.findOneAndUpdate({ name: driver.team }, {})
    })
  })
})



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
