const EntryList = require("../models/EntryList");
const NewsPost = require("../models/NewsPost");
const Season = require('../models/Season');
const Weekend = require('../models/Weekend');

const router = require("express").Router();

router.post('/api/createEntry', async (req, res) => {
    const created = await EntryList.create(req.body);
    let {name, driverNumber} = req.body;
    let currentSeason = await Season.find({});

    currentSeason = currentSeason[currentSeason.length - 1];
    // let weekend = currentSeason.weeekends[ - 1];
    let weekend = currentSeason.weekends.length - 1;
    weekend = currentSeason.weekends[weekend];
    console.log(weekend);
    let currentGrid = await Weekend.findOneAndUpdate({ _id: weekend }, {$push: {grid: created._id}}, {new: true});

    let msg = {
        message: `#${driverNumber} ${name} registered for this weeks race!`
    };
    let newsMsg = await NewsPost.create(msg)
    res.send(currentGrid);

})

router.get('/api/currentGrid', async (req, res) => {
    let currentSeason = await Season.find({});

    currentSeason = currentSeason[currentSeason.length - 1];
    // let weekend = currentSeason.weeekends[ - 1];
    let weekend = currentSeason.weekends.length - 1;
    weekend = currentSeason.weekends[weekend];
    console.log(weekend);
    let currentGrid = await Weekend.findOne({ _id: weekend }).populate('grid');
    currentGrid = currentGrid.grid;
    res.send(currentGrid);

})

module.exports = router;