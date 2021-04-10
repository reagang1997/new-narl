const router = require("express").Router();
const Track = require('../models/Track');
const CurrentTrack = require('../models/CurrentTrack');

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
    const track = await CurrentTrack.find({}).populate('track', 'trackLength turns name download numLaps');
    res.send(track[0]);
})

router.post('/api/newTrack', async (req, res) => {
    console.log(req.body);
    const newTrack = await Track.create(req.body);
    res.send(newTrack);
})

module.exports = router;