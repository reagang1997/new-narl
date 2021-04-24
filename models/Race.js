const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RaceSchema = new Schema({
    results: [
        {
            type: Schema.Types.ObjectId,
            ref: 'RaceResult'
        }
    ]
});

const Race = mongoose.model('Race', RaceSchema);

module.exports = Race;