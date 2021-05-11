const router = require("express").Router();
const Client = require('ftp');
const RaceResult = require('../models/RaceResult');
const Season = require('../models/Season');
const Weekend = require('../models/Weekend');
const Driver = require('../models/Driver');
const Team = require('../models/Team');
const Track = require('../models/Track');


router.get('/api/readRaceFile/:fileName', async (req, res) => {
    const c = new Client();
    c.on('ready', () => {
        c.get(`/173.234.30.178_11576/results/${req.params.fileName}`, (err, stream) => {
            if (err) throw err;
            let content = '';
            stream.on('data', function (chunk) {
                content += chunk.toString();
            });
            stream.on('end', async function () {
                // content variable now contains all file content. 
                const rawdata = JSON.parse(content);

                const raceResults = rawdata.Result;
                const raceLaps = rawdata.Laps;
                const cars = rawdata.Cars;

                let currentSeason = await Season.find({}).populate('weekends');
                currentSeason = currentSeason[currentSeason.length - 1];

                let currentWeekend = currentSeason.weekends[currentSeason.weekends.length - 1];

                let currentTrack = await Weekend.findOne({ _id: currentWeekend }).populate('currentTrack');
                currentTrack = currentTrack.currentTrack;
                console.log('CURRENT TRACK' + currentTrack);
                const points = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
                let fastestLap = {
                    time: 999999999,
                    name: '',
                    team: '',
                    guid: ''
                };
                raceResults.forEach(async (result, i) => {
                    if (result.BestLap === 999999999) {
                        return
                    }

                    if (result.BestLap < fastestLap.time) {
                        fastestLap.time = result.BestLap;
                        fastestLap.name = result.DriverName;
                        fastestLap.guid = result.DriverGuid;
                    }


                    // see if driver exists


                    // if exists
                    let team, name;
                    cars.forEach(car => {
                        if (car.Driver.Guid === result.DriverGuid) {
                            team = car.Driver.Team;
                            name = car.Driver.Name;
                            if (result.DriverName === fastestLap.name) {
                                fastestLap.team = team;
                            }
                        }
                    })
                    //create race Result
                    let tmpRR = {
                        driverName: name,
                        teamName: team,
                        rawLapTime: result.BestLap,
                        guid: result.DriverGuid,
                        points: points[i]
                    }
                    const newRR = await RaceResult.create(tmpRR);
                    //push new result into current weekend
                    const updatedWeekend = await Weekend.findOneAndUpdate({ _id: currentWeekend }, { $push: { race: newRR._id } });




                    // update driver points
                    if (i <= 9) {
                        if (i === 0) {
                            const addedPoints = await Driver.findOneAndUpdate({ guid: result.DriverGuid }, { $inc: { points: points[i], careerPoints: points[i], wins: 1, careerWins: 1 } }, { new: true });
                            console.log(addedPoints.team);
                            const teamPoints = await Team.findOneAndUpdate({ name: addedPoints.team }, { $inc: { points: points[i], historyPoints: points[i], wins: 1, historyWins: 1 } }, { new: true });
                        }
                        else {
                            const addedPoints = await Driver.findOneAndUpdate({ guid: result.DriverGuid }, { $inc: { points: points[i], careerPoints: points[i] } }, { new: true });
                            const teamPoints = await Team.findOneAndUpdate({ name: addedPoints.team }, { $inc: { points: points[i], historyPoints: points[i] } }, { new: true });

                        }
                    }

                    raceLaps.forEach(async (lap) => {

                        if (lap.LapTime === result.BestLap) {
                            let lastResult = await RaceResult.find({ guid: lap.DriverGuid });
                            lastResult = lastResult[lastResult.length - 1];

                            let updatedDriver = await RaceResult.findOneAndUpdate({ _id: lastResult._id }, { $set: { tire: lap.Tyre } }, { new: true });
                            let track = await Track.findOne({ _id: currentTrack._id });
                            let trackSector1 = track.rSector1;
                            let trackSector2 = track.rSector2;
                            let trackSector3 = track.rSector3;
                            let tmp1 = lap.Sectors[0]
                            let tmp2 = lap.Sectors[1]
                            let tmp3 = lap.Sectors[2]

                            if (tmp1 < updatedDriver.sector1time) {
                                let updatedSectors = await RaceResult.findOneAndUpdate({ _id: lastResult._id }, {
                                    $set:
                                    {
                                        sector1pb: tmp1
                                    }
                                });
                            }
                            if (tmp1 < trackSector1) {
                                let updatedSectors = await Track.findOneAndUpdate({ _id: currentTrack._id }, {
                                    $set:
                                    {
                                        rSector1: tmp1
                                    }
                                });
                            }
                            if (tmp2 < updatedDriver.sector2time) {
                                let updatedSectors = await RaceResult.findOneAndUpdate({ _id: lastResult._id }, {
                                    $set:
                                    {
                                        sector2pb: tmp2
                                    }
                                });
                            }
                            if (tmp2 < trackSector2) {
                                let updatedSectors = await Track.findOneAndUpdate({ _id: currentTrack._id }, {
                                    $set:
                                    {
                                        rSector2: tmp2
                                    }
                                });
                            }
                            if (tmp3 < updatedDriver.sector3time) {
                                let updatedSectors = await RaceResult.findOneAndUpdate({ _id: lastResult._id }, {
                                    $set:
                                    {
                                        sector3pb: tmp3
                                    }
                                });
                            }
                            if (tmp3 < trackSector3) {
                                let updatedSectors = await Track.findOneAndUpdate({ _id: currentTrack._id }, {
                                    $set:
                                    {
                                        rSector3: tmp3
                                    }
                                });
                            }

                            let updatedSectors = await RaceResult.findOneAndUpdate({ _id: lastResult._id }, {
                                $set:
                                {
                                    sector1time: tmp1,
                                    sector2time: tmp2,
                                    sector3time: tmp3,
                                }
                            });
                        }
                    })
                });

                const newResults = await Weekend.find({ _id: currentWeekend }).populate('race');
                res.status(200);
                res.send(newResults);
            })
        })
    })

    c.connect({
        host: '173.234.30.178',
        port: 8821,
        user: 'nbhapsgs',
        password: '9p:I0*xA59KMfh'
    });
})

router.get('/api/getFastestLap/:fileName', async (req, res) => {
    const c = new Client();
    c.on('ready', () => {
        c.get(`/173.234.30.178_11576/results/${req.params.fileName}`, (err, stream) => {
            if (err) throw err;
            let content = '';
            stream.on('data', function (chunk) {
                content += chunk.toString();
            });
            stream.on('end', async function () {
                // content variable now contains all file content. 
                const rawdata = JSON.parse(content);

                const raceResults = rawdata.Result;
                const cars = rawdata.Cars;

                let fastestLap = {
                    time: 999999999,
                    name: '',
                    team: '',
                    guid: ''
                };
                raceResults.forEach(async (result, i) => {
                    if (result.BestLap === 999999999) {
                        return
                    }

                    if (result.BestLap < fastestLap.time) {
                        fastestLap.time = result.BestLap;
                        fastestLap.name = result.DriverName;
                        fastestLap.guid = result.DriverGuid;
                    }

                    let team, name;
                    cars.forEach(car => {
                        if (car.Driver.Guid === result.DriverGuid) {
                            team = car.Driver.Team;
                            name = car.Driver.Name;
                            if (result.DriverName === fastestLap.name) {
                                fastestLap.team = team;
                            }
                        }
                    })
                    
                });

                //add fastest lap
                setFastestLaps(fastestLap, res);
                const newResults = await Weekend.find({ _id: currentWeekend }).populate('race');
                res.status(200);
                res.send(newResults);
            })
        })
    })

    c.connect({
        host: '173.234.30.178',
        port: 8821,
        user: 'nbhapsgs',
        password: '9p:I0*xA59KMfh'
    });
});

const setFastestLaps = async (fastestLap, res) => {
    console.log(fastestLap);
    let setFLinRR = await RaceResult.find({ guid: fastestLap.guid });
    console.log(setFLinRR);

    setFLinRR = setFLinRR[setFLinRR.length - 1];
    console.log(setFLinRR);
    const updatedinRR = await RaceResult.findOneAndUpdate({ _id: setFLinRR._id }, { $set: { fastestLap: true }, $inc: {points: 1} });
    const addedFL = await Driver.findOneAndUpdate({ guid: fastestLap.guid }, { $inc: { points: 1, fastestLaps: 1, careerFastestLaps: 1, careerPoints: 1 } });
    const addedFLteam = await Team.findOneAndUpdate({ name: fastestLap.team }, { $inc: { points: 1, fastestLaps: 1, historyFastestLaps: 1, historyPoints: 1 } });
    res.send({message: 'done'})
}


module.exports = router;