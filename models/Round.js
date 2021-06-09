const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoundSchema = new Schema({
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track'
    },
    date: {
        type: String,
        default: 'TBD'
    }
})


const Round = mongoose.model('Round', RoundSchema);

module.exports = Round;