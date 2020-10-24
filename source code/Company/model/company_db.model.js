const mongoose = require('mongoose');

//class schema
const companySchema = new mongoose.Schema({
    CompanyName: String,
    CompanyCode: String,
    CompanyEmail: String,
    CompanyPhone: String,
    CompanyAddress: String,
    GSTIN: String,
    CreatedBy: Number,
    CreatedDate: Date,
    ModifiedBy: Number,
    ModifiedDate: Date
});

//class Company
module.exports = mongoose.model('Company',companySchema);

