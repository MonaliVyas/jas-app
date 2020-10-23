const mongoose = require('mongoose');

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

//class User
module.exports = mongoose.model('Item', itemSchema);