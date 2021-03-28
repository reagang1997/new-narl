const router = require("express").Router();
const Driver = require('../models/Driver');
const Team = require('../models/Team');

router.get('/api/WDC', async (req, res) => {
    const drivers = await Driver.find({isActive: true}).sort({points: -1});
    console.log('hit');
    res.send(drivers);
})

router.get('/api/WCC', async (req, res) => {
    const teams = await Team.find({}).sort({points: -1});
    res.send(teams);
})

module.exports = router;