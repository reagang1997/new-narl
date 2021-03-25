const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WDCSchema = new Schema({
    name: String,
    team: String,
    points: Number,
    wins: Number,
    fastestLaps: Number
});

const WDC = mongoose.model('WDC', WDCSchema);

module.exports = WDC;