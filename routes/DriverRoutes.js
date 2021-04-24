const router = require("express").Router();
const Driver = require('../models/Driver');
const Team = require('../models/Team');
const EntryList = require('../models/EntryList');

router.post('/api/CreateNewDriver', async (req, res) => {
    const newDriver = await Driver.create(req.body);
    res.send(newDriver);
});

router.get('/api/getAllDrivers', async (req, res) => {
    const allDrivers = await Driver.find({});
    res.send(allDrivers);
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
    console.log(req.body);
    res.send(updated);
})

router.get('/api/openSeats', async (req, res) => {
    const seats = await Driver.find({ rsvp: 'No' });
    const entryList = await EntryList.find({});

    let open = seats.map(seat => {
        let found = false;
        entryList.forEach(entry => {
            if (seat.driverNumber == entry.driverNumber) {
                found = true;
                console.log('hit')
            }
        })

        if (!found) {
            return seat;
        }
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
})


module.exports = router;