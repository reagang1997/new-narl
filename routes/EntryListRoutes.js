const EntryList = require("../models/EntryList");

const router = require("express").Router();

router.post('/api/createEntry', async (req, res) => {
    const created = await EntryList.create(req.body);
    let currentSeason = await Season.find({});
    currentSeason = currentSeason[0];

    const newWeekend = await Weekend.create({});
    const updatedSeason = await Season.findOneAndUpdate({_id: currentSeason._id}, {$push: {grid: created._id}});
    res.send(created);
})

router.get('/api/currentGrid', async (req, res) => {
    const grid = await EntryList.find({});
    let currentSeason = await Season.find({});
    currentSeason = currentSeason[0];

    const newWeekend = await Weekend.create({});
    const updatedSeason = await Season.findOneAndUpdate({_id: currentSeason._id}).populate('grid');
    res.send(grid);
})

module.exports = router;