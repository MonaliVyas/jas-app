const mongoose = require('mongoose');

//schema bill
const billSchema = new mongoose.Schema({
    BillNo: Number,
    ChallanNo: Number,
    BillAmount: Number,
    CreatedBy: Number,
    CreatedOn: Date
});

//class Bill
module.exports  = mongoose.model('Bill',billSchema);