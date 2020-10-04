const mongoose = require('mongoose');

//schema bill
const billSchema = new mongoose.Schema({
    billno: Int16Array,
    challanNo: Int16Array,
    Price: Number,
    CreatedBy: Int16Array,
    CreatedOn: Date
});

//class Bill
module.exports  = mongoose.model('Bill',billSchema);