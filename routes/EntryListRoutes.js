const EntryList = require("../models/EntryList");

const router = require("express").Router();

router.post('/api/createEntry', async (req, res) => {
    const created = await EntryList.create(req.body);
    res.send(created);
})


module.exports = router;