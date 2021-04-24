const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WeekendSchema = new Schema({
    practice: {
        type: Schema.Types.ObjectId,
        ref: 'Practice'
    },
    qualy: {
        type: Schema.Types.ObjectId,
        ref: 'Qualy'
    },
    race: {
        type: Schema.Types.ObjectId,
        ref: 'Race'
    },
});

const Weekend = mongoose.model('Weekend', WeekendSchema);

module.exports = Weekend;