const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RaceResultSchema = new Schema({
    results: [
        {
            type: Schema.Types.ObjectId,
            ref: 'RaceResult'
        }
    ]
});

const RaceResult = mongoose.model('RaceResult', RaceResultSchema);

module.exports = RaceResult;