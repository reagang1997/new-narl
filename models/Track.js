const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: String,
    download: {
        type: String,
        default: ""
    },
    numLaps: Number,
    fastestLap: {
        driver: {
            type: String,
            default: ''
        },
        time: {
            type: Number,
            default: 99999999999
        }
    },
    trackLength: {
        type: Number,
        default: 0
    },
    turns: {
        type: Number,
        default: 99999999999
    },
    fastestQualy: {
        type: Number,
        default: 99999999999
    },
    fastestRace: {
        type: Number,
        default: 99999999999
    },
    rSector1: {
        type: Number, 
        default: 99999999999
    },
    rSector2: {
        type: Number, 
        default: 99999999999
    },
    rSector3: {
        type: Number, 
        default: 99999999999
    },
    pSector1: {
        type: Number, 
        default: 99999999999
    },
    pSector2: {
        type: Number, 
        default: 99999999999
    },
    pSector3: {
        type: Number, 
        default: 99999999999
    },
    qSector1: {
        type: Number, 
        default: 99999999999
    },
    qSector2: {
        type: Number, 
        default: 99999999999
    },
    qSector3: {
        type: Number, 
        default: 99999999999
    },
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;