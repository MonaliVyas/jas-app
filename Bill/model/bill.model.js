const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/jas_dev')
.then(() => console.log('Connect to mongodb..'))
.catch(err => console.error('Could not connect to mongodb..', err));


//schema bill
const billSchema = new mongoose.Schema({
    billno: Number,
    challanNo: Number,
    Price: Number
});

//class Bill
const Bill = mongoose.model('Bill',billSchema);
class BillModel {
    insertBill (){
        const bill = new Bill({
            billno: 1,
            challanNo: 1,
            Price: 750
        });
    
        try{
            const result = await bill.save();
            console.log(result);
        }
       catch(ex){
           console.log(ex.message);
       }
    };
    
}
//db insert bill

//db update bill
Bill.updateBillByID = async function(){
    try{
        const result = await Bill.update({ _id: id},{
            $set: {
                // billno: 1,
                // challanNo: 1,
                // Price: 750 
            }        
            });
            console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
}

//db delete bill
Bill.deleteBillByID = async function(id){
    try{
        const result = Bill.deleteOne({_id: id});
        console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
}

//db select bill
async function selectBill(){
   const result = await Bill.find();
  // console.log(result);
   return result;
}

async function selectBill2(){
    
}

//db select bill by ID
async function selectBillByID(id){
    const result = await Bill.findById(id)
    return result;
}

// module.exports = BillModel;
class Bill {
    constructor(billno, challanNo, Price){
        this.billno= billno,
        this.challanNo= challanNo,
        this.Price= Price
    }
}

var x;

x.selectBill2 = (req, res) => {
    const result = await Bill.find();
    // console.log(result);
     return result;
}

exports.x = x;