const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: String,
    points: Number,
    wins: Number,
    fastestLaps: Number,
    drivers: Array,
    historyPoints: Number,
    historyWins: Number,
    historyFastestLaps: Number
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;