const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RaceFileSchema = new Schema({
    fileName: String
});

const RaceFile = mongoose.model('RaceFile', RaceFileSchema);

module.exports = RaceFile;