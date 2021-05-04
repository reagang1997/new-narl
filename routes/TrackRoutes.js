const router = require("express").Router();
const Track = require('../models/Track');
const CurrentTrack = require('../models/CurrentTrack');
const Season = require('../models/Season');
const Weekend = require('../models/Weekend');

router.get('/api/allTracks', async (req, res) => {
    const tracks = await Track.find({});
    res.send(tracks);
})

router.put('/api/setCurrentTrack/:id', async (req, res) => {
    const deleted = await CurrentTrack.deleteMany({});
    const foundTrack = await Track.findOne({_id: req.params.id});
    const currentTrack = await CurrentTrack.create({track: foundTrack._id});
    res.send(currentTrack);
})

router.get('/api/getCurrentTrack', async (req, res) => {
    let currentSeason = await Season.find({});
    currentSeason = currentSeason[currentSeason.length - 1];
    // let weekend = currentSeason.weeekends[ - 1];
    let weekend = currentSeason.weekends.length - 1;
    weekend = currentSeason.weekends[weekend];
    console.log(weekend);
    let currentTrack = await Weekend.findOne({ _id: weekend }).populate('currentTrack', 'trackLength turns name download numLaps');
    currentTrack = currentTrack.currentTrack;
    res.send(currentTrack);
})

router.post('/api/newTrack', async (req, res) => {
    console.log(req.body);
    const newTrack = await Track.create(req.body);
    res.send(newTrack);
})

module.exports = router;