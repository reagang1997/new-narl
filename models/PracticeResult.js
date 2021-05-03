const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PracticeResultSchema = new Schema({
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
    },
    sector1color: {
        type: String,
        default: ""
    },sector2color: {
        type: String,
        default: ""
    },sector3color: {
        type: String,
        default: ""
    }
});

const PracticeTable = mongoose.model('PracticeTable', PracticeResultSchema);

module.exports = PracticeTable;