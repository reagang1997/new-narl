const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PracticeTableSchema = new Schema({
    driverName: String,
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
    sector1: {
        type: Number,
        default: 9999999999
    },
    sector2: {
        type: Number,
        default: 9999999999
    },
    sector3: {
        type: Number,
        default: 9999999999
    },
});

const PracticeTable = mongoose.model('PracticeTable', PracticeTableSchema);

module.exports = PracticeTable;