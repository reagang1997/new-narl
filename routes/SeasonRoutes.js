const router = require("express").Router();
const Round = require("../models/Round");
const Season = require('../models/Season');
const Track = require('../models/Track');

router.post('/api/createNewSeason', async (req, res) => {
    const newSeason = await Season.create({});
    res.send(newSeason);
})

router.post('/api/addRound', async (req, res) => {
    const {track} = req.body;
    const foundTrack = await Track.findOne({name: track});
    foundTrack.save();
    const createdRound = await Round.create({track: foundTrack._id});
    createdRound.save();
    let currentSeason = await Season.find();
    currentSeason = currentSeason[currentSeason.length - 1];
    currentSeason.rounds.push(createdRound._id);
    currentSeason.save();
    res.status(200).send({message: 'season created'})
})

router.get('/api/currentSeasonSchedule', async (req, res) => {
    let currentSeason = await Season.find().populate({
        path: 'rounds',
        model: 'Round',
        populate: {
            path: 'track',
            model: 'Track'
        }
    });
    currentSeason = currentSeason[currentSeason.length - 1];
   
    res.status(200).send(currentSeason.rounds);
})

module.exports = router;