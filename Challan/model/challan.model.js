const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/jas_dev')
.then(() => console.log('Connect to mongodb..'))
.catch(err => console.error('Could not connect to mongodb..', err));

//schema challan
const challanSchema = new mongoose.Schema({
    ChallanNo: Number,
    CompanyCode: String,
    Date: Date,
    Item: String,
    Qty: Number
});

//class Challan
const Challan = mongoose.model('Challan',challanSchema);


//db insert challan
async function insertChallan(){
    const challan = new Challan({
        ChallanNo: 1,
        CompanyCode: '123',
        Date: Date.now(),
        Item: 'Number',
        Qty: 3
    });

    const result = await challan.save();
    console.log(result);
}

//db update challan
async function updateChallanByID(id){
    const result = await Challan.update({ _id: id}, {
        $set: {
            // ChallanNo: 1,
            // CompanyCode: '123',
            // Date: Date.now(),
            // Item: 'Number',
            // Qty: 3
        }
    });
    console.log(result);
}

//db delete challan
async function deleteChallanByID(id){
    const result = Challan.deleteOne(id);
}

//db select challan
function selectChallan(){
 const result = await Challan.find();
 return result;
}

//db select challan by ID
function selectChallanByID(id){
    const result = await Challan.findById(id);
    return result;
}

insertChallan();