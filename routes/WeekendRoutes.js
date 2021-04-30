const router = require("express").Router();
const Weekend = require('../models/Weekend');
const Season = require('../models/Season');


router.post('/api/createWeekend', async (req, res) => {
    let currentSeason = await Season.find({});
    currentSeason = currentSeason[0];

    const newWeekend = await Weekend.create({});
    const updatedSeason = await Season.findOneAndUpdate({_id: currentSeason._id}, {$push: {weekends: newWeekend._id}});
    res.send(updatedSeason);
})

module.exports = router;