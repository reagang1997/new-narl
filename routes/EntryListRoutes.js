const EntryList = require("../models/EntryList");

const router = require("express").Router();

router.post('/api/createEntry', async (req, res) => {
    const created = await EntryList.create(req.body);
    res.send(created);
})

router.get('/api/currentGrid', async (req, res) => {
    const grid = await EntryList.find({});
    res.send(grid);
})

module.exports = router;