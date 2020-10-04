const mongoose = require('mongoose');

//schema item
const itemSchema = new mongoose.Schema({
    ItemNo: Number,
    Name: String,
    DrawingNo: String,
    PartCode: String,
    Material: String,
    Price: Number,
    ValidTo: Date,
    ValidFrom: Date,
    CreatedBy: Number
});

//class Item
module.exports = mongoose.model('Item', itemSchema);
