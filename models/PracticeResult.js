const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PracticeResultSchema = new Schema({
    fileName: String
});

const PracticeResult = mongoose.model('PracticeResult', PracticeResultSchema);

module.exports = PracticeResult;