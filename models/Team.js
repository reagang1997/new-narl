const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {
        type: String
    },
    position: {
        type: Number,
        default: 0
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
    drivers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            default: []
        }
    ],
    historyPoints: {
        type: Number,
        default: 0
    },
    historyWins: {
        type: Number,
        default: 0
    },
    historyFastestLaps: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: false
    }
    wcc: {
        type: Number,
        default: 0
    },
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;