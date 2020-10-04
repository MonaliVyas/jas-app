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
 })

 //class Bill
 const Bill = mongoose.model('Bill',billSchema);
 //var BillModel = Bill;

 //db insert bill

 async function insertBill(){
     const bill = new Bill({
         billno: 1,
         challanNo: 1,
         Price: 750
     });
     const result = await bill.save();
     console.log(result);
 }

 //db update bill
 async function updateBillByID(){
     const result = await Bill.update({ _id: id},{
     $set: {
         // billno: 1,
         // challanNo: 1,
         // Price: 750 
     }        
     })
     console.log(result);
 }

 //db delete bill
 async function deleteBillByID(id){
     const result = Bill.deleteOne({_id: id});
 }

 //db select bill
 async function selectBill(){
  const result = await Bill.find();
  return result;
 }

 //db select bill by ID
 async function selectBillByID(id){
     const result = await Bill.findById(id)
     return result;
}