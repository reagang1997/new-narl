const router = require("express").Router();
const Driver = require('../models/Driver');
const Team = require('../models/Team');
const EntryList = require('../models/EntryList');
const Season = require('../models/Season');
const Weekend = require('../models/Weekend');

router.post('/api/CreateNewDriver', async (req, res) => {
    const newDriver = await Driver.create(req.body);
    res.send(newDriver);
});

router.get('/api/getAllDrivers', async (req, res) => {
    const allDrivers = await Driver.find({});
    res.send(allDrivers);
})

router.put('/api/driver/dropSeat/:guid', async (req, res) => {
    console.log('hit');
    const droppedDriver = await Driver.findOneAndUpdate({guid: req.params.guid}, {$set: {team: 'Reserve'}});
    console.log(droppedDriver);
    let droppedTeam = await Team.findOne({name: droppedDriver.team});
    const index = droppedTeam.drivers.indexOf(droppedDriver._id);
    console.log(index)
    console.log(droppedDriver._id);
    const newDrivers = droppedTeam.drivers.filter((id, i) => {
        console.log(i);
        if(i !== index){
            return id;
        }
        console.log(`id: ${id}               droppedID: ${droppedDriver._id}`);
    
    });
    console.log(newDrivers);
    
    console.log(droppedTeam);
    droppedTeam = await Team.findOneAndUpdate({name: droppedDriver.team}, {$set: {drivers: newDrivers}}); 

    res.send(droppedTeam);
})

router.get('/api/singleDriver/:id', async (req, res) => {
    const found = await Driver.findOne({ _id: req.params.id });
    res.send(found);
})

router.get('/api/deleteDriver/:id', async (req, res) => {
    const deleted = await Driver.deleteOne({ _id: req.params.id });
    res.send(deleted);
})

router.get('/api/drivers/:name', async (req, res) => {
    const found = await Driver.find({ name: { $regex: req.params.name } });
    res.send(found)
})

router.post('/api/updateRSVP', async (req, res) => {
    
    const updated = await Driver.findOneAndUpdate({ guid: req.body.guid }, { $set: { rsvp: req.body.rsvp } });
    if(req.body.rsvp === 'No'){
        let msg = {
            message: `${updated.name} just opened their seat for Reserve Driver!`
        };
        let newsMsg = await NewsPost.create(msg)
    }
    console.log(req.body);
    res.send(updated);
})

router.get('/api/openSeats', async (req, res) => {
    let rsvpNo = await Driver.find({ rsvp: 'No' });
    let currentSeason = await Season.find({});

    currentSeason = currentSeason[currentSeason.length - 1];
    // let weekend = currentSeason.weeekends[ - 1];
    let weekend = currentSeason.weekends.length - 1;
    weekend = currentSeason.weekends[weekend];
    console.log(weekend);
    let entryList = await Weekend.findOne({ _id: weekend }).populate('grid').select('grid');
    entryList = entryList.grid;

    console.log('56 ');
    console.log(entryList);
    const openSeats = await findOpenSeats();

    rsvpNo.forEach(seat => {
        let found = false;
        openSeats.forEach(openSeat => {
            if (seat.team === openSeat.team) {
                openSeat.numbers.push(seat.driverNumber);
                found = true;
            }
        })
        if (!found) {
            let tmp = {
                numbers: [seat.driverNumber],
                team: seat.team
            };
            openSeats.push(tmp);
        }
    })

    
    let open = openSeats.map(seat => {
        seat.numbers.forEach(number => {
            entryList.forEach(entry => {
                if (number === +entry.driverNumber) {
                    let index = seat.numbers.indexOf(number);
                    seat.numbers.splice(index, 1);
                }
            })
        })
        return seat;

    })

    res.send(open);
})

router.put('/api/setDriverStats/:driverID', async (req, res) => {
    const stat = req.body.stat;
    const value = req.body.value;
    switch (stat) {
        case 'points':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { points: value } }, { new: true });
            break;
        case 'wins':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { wins: value } }, { new: true });
            break;
        case 'fastestLaps':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { fastestLaps: value } }, { new: true });
            break;
        case 'careerLaps':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { careerLaps: value } }, { new: true });
            break;
        case 'careerPoints':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { careerPoints: value } }, { new: true });
            break;
        case 'careerWins':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { careerWins: value } }, { new: true });
            break;
        case 'careerFastestLaps':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { careerFastestLaps: value } }, { new: true });
            break;
        case 'isActive':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { isActive: value } }, { new: true });
            console.log(value);
            break;
        case 'team':
            const foundTeam = await Team.findOne({ _id: value });
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { team: foundTeam.name } }, { new: true });
        case 'teamHistory':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $push: { teamHistory: value } }, { new: true });
            break;
        case 'name':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { name: value } }, { new: true });
            break;
        case 'wcc':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { wcc: value } }, { new: true });
            break;
        case 'wdc':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $set: { wdc: value } }, { new: true });
            break;
    }

    res.send(updatedDriver);
});

router.put('/api/IncDriverStats/:driverID', async (req, res) => {
    const stat = req.body.stat;
    const value = req.body.value;
    switch (stat) {
        case 'points':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $inc: { points: value } }, { new: true });
            break;
        case 'wins':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $inc: { wins: value } }, { new: true });
            break;
        case 'fastestLaps':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $inc: { fastestLaps: value } }, { new: true });
            break;
        case 'careerLaps':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $inc: { careerLaps: value } }, { new: true });
            break;
        case 'careerPoints':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $inc: { careerPoints: value } }, { new: true });
            break;
        case 'careerWins':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $inc: { careerWins: value } }, { new: true });
            break;
        case 'careerFastestLaps':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $inc: { careerFastestLaps: value } }, { new: true });
            break;
        case 'wcc':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $inc: { wcc: value } }, { new: true });
            break;
        case 'wdc':
            updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.driverID }, { $inc: { wdc: value } }, { new: true });
            break;

    }

    res.send(updatedDriver);
});

router.get('/api/driver/:guid', async (req, res) => {
    //left off here
    const tmp = req.params.guid;
    const foundDriver = await Driver.findOne({ guid: tmp });
    console.log(foundDriver);
    res.send(foundDriver);
});

router.put('/api/driver/clearPoints', async (req, res) => {
    const cleared = await Driver.updateMany({}, {$set: {points: 0}});
    res.send(cleared);
})

router.get('/api/openTeamSeats', async (req, res) => {

    const openSeats = await findOpenSeats();
    console.log(openSeats);

    res.send(openSeats)
});

router.put('/api/joinTeam', async (req, res) => {
    const {guid, team, driverNumber} = req.body;
    const updated = await Driver.findOneAndUpdate({guid: guid}, {$set: {team: team, driverNumber: driverNumber}});
    const updatedTeam = await Team.findOneAndUpdate({name: team}, {$push: {drivers: updated._id}});
    console.log('UPDATED: ' , updated);
    res.send(updated);
})

router.get('/api/setRSVP', async (req, res) => {
    const updated = await Driver.updateMany({}, { $set: { rsvp: '' } });
    res.send(updated);
})

const findOpenSeats = async () => {
    const ferrari = [16, 55];
    const williams = [6, 63];
    const mercedes = [77, 44];
    const aston = [18, 5];
    const haas = [47, 9];
    const mclaren = [3, 4];
    const redbull = [33, 11];
    const alpine = [31, 14];
    const alfa = [99, 7];
    const alpha = [10, 22];

    let openSeats = [];

    const allOpen = await Team.find({ drivers: { $size: 0 } }).select('name drivers -_id').populate('drivers', 'driverNumber');
    allOpen.forEach(team => {
        let tmp = {
            numbers: [],
            team: team.name
        }
        switch (team.name) {
            case 'HAAS':
                tmp.numbers = haas;
                break;
            case 'Alpha Tauri':
                tmp.numbers = alpha;
                break;
            case 'Williams':
                tmp.numbers = williams;
                break;
            case 'Red Bull':
                tmp.numbers = redbull;
                break;
            case 'Alpine':
                tmp.numbers = alpine;
                break;
            case 'Mercedes':
                tmp.numbers = mercedes;
                break;
            case 'McLaren':
                tmp.numbers = mclaren;
                break;
            case 'Alfa Romeo':
                tmp.numbers = alfa;
                break;
            case 'Aston Martin':
                tmp.numbers = aston;
                break;
            case 'Ferrari':
                tmp.numbers = ferrari;
                break;
        }

        openSeats.push(tmp);
    })

    const oneOpen = await Team.find({ drivers: { $size: 1 } }).select('name drivers -_id').populate('drivers', 'driverNumber');
    oneOpen.forEach(team => {
        console.log(team.name);
        let tmp = {
            numbers: [],
            team: team.name
        }
        switch (team.name) {
            case 'HAAS':
                team.drivers.forEach(driver => {
                    const numberIndex = haas.indexOf(driver.driverNumber);
                    console.log(numberIndex);
                    // if(numberIndex === -1){console.log(driver)}
                    if (numberIndex === 1) {
                        tmp.numbers.push(haas[0]);
                    }
                    else {
                        tmp.numbers.push(haas[1]);
                    }
                })
                break;
            case 'Alpha Tauri':
                team.drivers.forEach(driver => {
                    const numberIndex = alpha.indexOf(driver.driverNumber);
                    console.log(numberIndex);
                    // if(numberIndex === -1){console.log(driver)}

                    if (numberIndex === 1) {
                        tmp.numbers.push(alpha[0]);
                    }
                    else {
                        tmp.numbers.push(alpha[1]);
                    }
                })
                break;

            case 'Williams':
                team.drivers.forEach(driver => {
                    const numberIndex = williams.indexOf(driver.driverNumber);
                    console.log(numberIndex);
                    // if(numberIndex === -1){console.log(driver)}

                    if (numberIndex === 1) {
                        tmp.numbers.push(williams[0]);
                    }
                    else {
                        tmp.numbers.push(williams[1]);
                    }
                })
                break;

            case 'Red Bull':
                team.drivers.forEach(driver => {
                    const numberIndex = redbull.indexOf(driver.driverNumber);
                    console.log(numberIndex);
                    // if(numberIndex === -1){console.log(driver)}

                    if (numberIndex === 1) {
                        tmp.numbers.push(redbull[0]);
                    }
                    else {
                        tmp.numbers.push(redbull[1]);
                    }
                })
                break;

            case 'Alpine':
                team.drivers.forEach(driver => {
                    const numberIndex = alpine.indexOf(driver.driverNumber);
                    console.log(numberIndex);
                    // if(numberIndex === -1){console.log(driver)}

                    if (numberIndex === 1) {
                        tmp.numbers.push(alpine[0]);
                    }
                    else {
                        tmp.numbers.push(alpine[1]);
                    }
                })
                break;

            case 'Mercedes':
                team.drivers.forEach(driver => {
                    const numberIndex = mercedes.indexOf(driver.driverNumber);
                    console.log(numberIndex);
                    // if(numberIndex === -1){console.log(driver)}

                    if (numberIndex === 1) {
                        tmp.numbers.push(mercedes[0]);
                    }
                    else {
                        tmp.numbers.push(mercedes[1]);
                    }
                })
                break;

            case 'McLaren':
                team.drivers.forEach(driver => {
                    const numberIndex = mclaren.indexOf(driver.driverNumber);
                    console.log(numberIndex);
                    // if(numberIndex === -1){console.log(driver)}

                    if (numberIndex === 1) {
                        tmp.numbers.push(mclaren[0]);
                    }
                    else {
                        tmp.numbers.push(mclaren[1]);
                    }
                })
                break;

            case 'Alfa Romeo':
                team.drivers.forEach(driver => {
                    console.log(driver);
                    const numberIndex = alfa.indexOf(driver.driverNumber);
                    console.log(numberIndex);
                    if (numberIndex === -1) { console.log(driver) }

                    if (numberIndex === 1) {
                        tmp.numbers.push(alfa[0]);
                    }
                    else {
                        tmp.numbers.push(alfa[1]);
                    }
                })
                break;

            case 'Aston Martin':
                team.drivers.forEach(driver => {
                    const numberIndex = aston.indexOf(driver.driverNumber);
                    console.log(numberIndex);
                    if (numberIndex === -1) { console.log(driver) }

                    if (numberIndex === 1) {
                        tmp.numbers.push(aston[0]);
                    }
                    else {
                        tmp.numbers.push(aston[1]);
                    }
                })
                break;

            case 'Ferrari':
                team.drivers.forEach(driver => {
                    const numberIndex = ferrari.indexOf(driver.driverNumber);
                    console.log(numberIndex);
                    if (numberIndex === -1) { console.log(driver) }

                    if (numberIndex === 1) {
                        tmp.numbers.push(ferrari[0]);
                    }
                    else {
                        tmp.numbers.push(ferrari[1]);
                    }
                })
                break;

        }

        openSeats.push(tmp);
    })

    return (openSeats);

}
module.exports = router;