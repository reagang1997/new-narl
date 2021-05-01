const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PracticeFileSchema = new Schema({
    fileName: String
});

const PracticeResult = mongoose.model('PracticeResult', PracticeFileSchema);

module.exports = PracticeResult;