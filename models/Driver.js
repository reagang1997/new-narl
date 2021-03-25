const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    name: String,
    team: String,
    points: Number,
    wins: Number,
    fastestLaps: Number,
    careerLaps: Number,
    careerPoints: Number,
    careerWins: Number,
    careerFastestLaps: Number,
    teamHistory: Array
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;