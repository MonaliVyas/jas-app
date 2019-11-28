const Bill = require('../model/bill.model');
//import {Bill} from '../model/bill.model'; 
function CreateBill(){
    var objBill = new Bill();
    objBill.insertBill();
}

