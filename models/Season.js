const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
    weekends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Weekend'
        }
    ]
});

const Season = mongoose.model('Season', SeasonSchema);

module.exports = Season;