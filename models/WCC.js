const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WCCSchema = new Schema({
    team: String,
    points: Number,
    wins: Number,
    fastestLaps: Number
});

const WCC = mongoose.model('WCC', WCCSchema);

module.exports = WCC;