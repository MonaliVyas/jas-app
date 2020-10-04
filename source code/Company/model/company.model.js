const mongoose = require('mongoose');

//class schema
const companySchema = new mongoose.Schema({
    Name: String,
    CompanyCode: String,
    Email: String,
    Phone: String,
    Address: String,
    GSTIN: String,
    CreatedBy: Number,
    CreatedDate: Date,
    ModifiedBy: Number,
    ModifiedDate: Date
});

//class Company
module.exports = mongoose.model('Company',companySchema);

