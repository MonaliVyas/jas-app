const Bill = require('../model/bill.model');
const mongoose = require('mongoose');
//db insert bill
const insertBill = (request, response) => {
    const bill = new Bill({
        billno: 1,
        challanNo: 1,
        Price: 750,
        CreatedBy: 1,
        CreatedOn: '20/10/2019'
    });

    bill.save().then(result => {
        response.status(200).send({
            message: "Record inserted successfully"
        })
    }).catch(error => {
        response.status(500).send({
            message: error.message || "some error occured while inserting the record."
        })
    })

}

//db update bill
const updateBillByID = (request, response) => {

    Bill.update({ _id: request.params.billId }, {
        $set: {
            billno: 1,
            challanNo: 2,
            Price: 1000,
            CreatedBy: 1,
            CreatedOn: '20/10/2019'
        }
    }).then(result => {
        response.status(200).send({
            message: "Record updated successfully."
        })
    }).catch(error => {
        response.status(500).send({
            message: error.message || "some error occured while inserting the record."
        })
    });

}

//db delete bill
const deleteBillByID = (request, response) => {
    Bill.deleteOne({ _id: request.params.billId }).then(result => {
        response.status(200).send({
            message: "Record deleted successfully"
        })
    }).catch(error => {
        response.status(500).send({
            message: error.message || "some error occured while deleting the record."
        })
    });
}

//db select bill
const selectBill = (request, response) => {
    Bill.find().then(bills => {
        if (!bills) {
            response.status(404).send({
                message: "No data found "
            });
            retrun;
        }
        response.status(200).send(bills);
    }).catch(error => {
        response.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        })
    });
}

//db select bill by ID
const selectBillByID = (request, response) => {
    //console.log('1');
    console.log(request.params.billId);
    Bill.findById(request.params.billId).then(bill => {
        if (!bill) {
            response.status(404).send({
                message: "No data found "
            });
            retrun;
        }
        response.status(200).send(bill);
    }).catch(error => {
        response.status(500).send({
            message: error.message || "Some error occurred while creating the Note."
        })
    });
}

exports.insertBill = insertBill;
exports.updateBillByID = updateBillByID;
exports.deleteBillByID = deleteBillByID;
exports.selectBill = selectBill;
exports.selectBillByID = selectBillByID;
