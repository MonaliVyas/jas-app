const mongoose = require('mongoose');

//schema challan
const challanSchema = new mongoose.Schema({
    ChallanNo: Number,
    CompanyCode: String,
    Date: Date,
    Item: String,
    Qty: Number,
    CreatedBy: Int16Array,
    CreatedOn: Date
});

//class Challan
module.exports = mongoose.model('Challan',challanSchema);
