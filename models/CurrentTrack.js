const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CurrentTrackSchema = new Schema({
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track'
    }
});

const CurrentTack = mongoose.model('CurrentTack', CurrentTrackSchema);

module.exports = CurrentTack;
