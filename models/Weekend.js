const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WeekendSchema = new Schema({
    currentTrack: {type: Schema.Types.ObjectId, ref: 'Track'},
    practice: [{
        type: Schema.Types.ObjectId,
        ref: 'PracticeResult',
        default: []
    }],
    grid: [{
        type: Schema.Types.ObjectId,
        ref: 'EntryList',
        default: []
    }],
    qualy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'QualyResult',
            default: []
        }
    ],
    race: [{
        type: Schema.Types.ObjectId,
        ref: 'RaceResult',
        default: []
    }],
    registration: {
        type: String,
        default: 'Open'
    }
});

const Weekend = mongoose.model('Weekend', WeekendSchema);

module.exports = Weekend;