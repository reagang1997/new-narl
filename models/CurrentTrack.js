const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CurrentTrackSchema = new Schema({
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track'
    }
});

const CurrentTrack = mongoose.model('CurrentTrack', CurrentTrackSchema);

module.exports = CurrentTrack;
