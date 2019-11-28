const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/jas_dev')
.then(() => console.log('Connect to mongodb..'))
.catch(err => console.err('Could not connect to mongodb..',err));

//class schema
const companySchema = new mongoose.Schema({
    name: String,
    code: String,
    email: String,
    phone: Number,
    address: String,
    GSTNo: String
});

//class Company
const Company = mongoose.model('Company',companySchema);

//db insert company
async function insertCompany(){
    const company = new Company({
        name: 'KHS',
        code: '123',
        email: 'kvyas@khs.com',
        phone: 1234567890,
        address: 'Motera',
        GSTNo: '123456789asdrfgty'
    });
    const result = await company.save();
    console.log(result);
}

//db update company
async function updateCompanyByID(){
    const result = await Company.update({ _id: id}, {
        $set: {
            // name: 'KHS',
            // code: '123',
            // email: 'kvyas@khs.com',
            // phone: 1234567890,
            // address: 'Motera',
            // GSTNo: '123456789asdrfgty'
        }
    })
    console.log(result);
}

//db delete company
async function deleteCompanyByID(id){
    const result = await Company.deleteOne(id);
}

//db select company
async function selectCompany(){
    const result = await Company.find();
    return result;
}

//db select company by ID
async function selectCompanyByID(id){
    const result = await Company.findById(id);
    return result;
}


//insertCompany()