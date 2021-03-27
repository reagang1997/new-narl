const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    name: String,
    team: {
        type: String,
        default: ''
    },
    points: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    fastestLaps: {
        type: Number,
        default: 0
    },
    careerLaps: {
        type: Number,
        default: 0
    },
    careerPoints: {
        type: Number,
        default: 0
    },
    careerWins: {
        type: Number,
        default: 0
    },
    careerFastestLaps:{
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: false
    },
    teamHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Team',
            default: []
        }
    ]
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;