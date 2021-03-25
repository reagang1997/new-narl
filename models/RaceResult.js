const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RaceResultSchema = new Schema({
    fileName: String
});

const RaceHistory = mongoose.model('RaceHistory', RaceResultSchema);

module.exports = RaceHistory;