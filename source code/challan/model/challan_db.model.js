const mongoose = require('mongoose');

//schema challan
const challanSchema = new mongoose.Schema({
    ChallanNo: Number,
    CompanyId: String,
    Date: Date,
    Items: [{
        ItemId: String,
        Price: Number,
        Qty: Number,
    }],
    CreatedBy: Number,
    CreatedOn: Date
});

//class Challan
module.exports = mongoose.model('Challan',challanSchema);
