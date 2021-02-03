const mongoose = require('mongoose');

const LargeCSVSchema = mongoose.Schema({
    id: Number,
    Col1:String,
    Col2:String
});

module.exports = mongoose.model('LargeCSV', LargeCSVSchema);