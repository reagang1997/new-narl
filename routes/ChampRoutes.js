const router = require("express").Router();
const Driver = require('../models/Driver');
const Team = require('../models/Team');
const Season = require('../models/Season')

router.get('/api/WDC', async (req, res) => {
    const drivers = await Driver.find({isActive: true}).sort({points: -1});
    console.log('hit');
    res.send(drivers);
})

router.get('/api/WCC', async (req, res) => {
    const teams = await Team.find({}).sort({points: -1}).populate('drivers');
    res.send(teams);
});

router.put('/api/champ/newChamp', async (req, res) => {
    const updatedDrivers = await Driver.updateMany({}, {$set: {points: 0, wins: 0, fastestLaps: 0, team: 'Reserve', driverNumber: 0}});
    const updatedTeams = await Team.updateMany({}, {$set: {drivers: [], points: 0, wins: 0, fastestLaps: 0 }});
    const newSeason = await Season.create({});

    res.status(200).send({message: 'All Updated'});
})

module.exports = router;