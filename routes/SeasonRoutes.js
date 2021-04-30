const router = require("express").Router();
const Season = require('../models/Season');

router.post('/api/createNewSeason', async (req, res) => {
    const newSeason = await Season.create({});
    res.send(newSeason);
})

module.exports = router;