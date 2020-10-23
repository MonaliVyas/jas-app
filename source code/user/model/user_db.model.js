const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Gender: String,
    DOB: Date,
    Email: String,
    Mobile: String,
    Role: Number,
    IsActive: Boolean,
    CreatedBy: Number,
    CreatedDate: Date,
    ModifiedBy: Number,
	ModifiedDate: Date
});

//class User
module.exports = mongoose.model('User',userSchema);