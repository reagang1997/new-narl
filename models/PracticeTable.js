const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PracticeTableSchema = new Schema({
    driverName: String,
    driverID: {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    },
    teamName: String,
    rawLapTime: Number,
    tire: String,
    laps: Number
});

const PracticeTable = mongoose.model('PracticeTable', PracticeTableSchema);

module.exports = PracticeTable;