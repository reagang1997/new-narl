const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
    weekends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Weekend',
            default: []
        }
    ],
    rounds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Round',
            default: []
        }
    ],
    currentRound: {
        type: Number,
        default: 0
    }
});

const Season = mongoose.model('Season', SeasonSchema);

module.exports = Season;