const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PracticeFileSchema = new Schema({
    fileName: String
});

const PracticeFile = mongoose.model('PracticeFile', PracticeFileSchema);

module.exports = PracticeFile;