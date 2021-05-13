const NewsPost = require("../models/NewsPost");

const router = require("express").Router();


router.get('/api/news', async (req, res) => {
    const news = await NewsPost.find({}).limit(10);
    res.send(news);
})
module.exports = router;
