const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EntryListSchema = new Schema({
    name: String,
    driverNumber: String,
    team: String,
    guid: String
});

const EntryList = mongoose.model('EntryList', EntryListSchema);

module.exports = EntryList;