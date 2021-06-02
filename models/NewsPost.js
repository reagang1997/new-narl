const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsPostSchema = new Schema({
    message: String
});

const NewsPost = mongoose.model('NewsPost', NewsPostSchema);

module.exports = NewsPost;
