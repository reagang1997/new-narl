const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QualyResultSchema = new Schema({
    driverName: String,
    guid: String,
    driverID: {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    },
    teamName: {
        type: String,
        default: ''
    },
    rawLapTime: {
        type: Number,
        default: 9999999999
    },
    tire: {
        type: String,
        default: ''
    },
    laps: {
        type: Number,
        default: 0
    },
    sector1time: {
        type: Number,
        default: 9999999999
    },
    sector2time: {
        type: Number,
        default: 9999999999
    },
    sector3time: {
        type: Number,
        default: 9999999999
    },
    sector1pb: {
        type: Number,
        default: 9999999999
    },
    sector2pb: {
        type: Number,
        default: 9999999999
    },
    sector3pb: {
        type: Number,
        default: 9999999999
    }
});

const QualyResult = mongoose.model('QualyResult', QualyResultSchema);

module.exports = QualyResult;