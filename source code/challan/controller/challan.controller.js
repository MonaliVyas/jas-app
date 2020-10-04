const Challan = require('../model/challan.model');
const mongoose = require('mongoose');
//db insert challan
const insertChallan = (request, response) => {
    const challan = new Challan({
        ChallanNo: 2,
        CompanyCode: '123',
        Date: Date.now(),
        Item: 'Number',
        Qty: 3,
        CreatedBy: 1,
        CreatedOn: '20/10/2019'
    });
    challan.save().then(result => {
        response.status(200).send({
            message: "Record inserted successfully"
        })
    }).catch(error => {
        response.status(500).send({
            message: error.message || "some error occured while inserting the record."
        })
    })
}

//db update challan
const updateChallanByID = (request, response) => {
    Challan.update({ _id: request.params.challanId}, {
        $set: {
            ChallanNo: 3,
            CompanyCode: '123',
            Date: Date.now(),
            Item: 'Number',
            Qty: 3,
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

//db delete challan
const deleteChallanByID = (request, response) => {
    Challan.deleteOne({ _id: request.params.challanId }).then(result => {
        response.status(200).send({
            message: "Record deleted successfully"
        })
    }).catch(error => {
        response.status(500).send({
            message: error.message || "some error occured while deleting the record."
        })
    });
}

//db select challan
const selectChallan = (request, response) => {
    Challan.find().then(challans => {
        if (!challans) {
            response.status(404).send({
                message: "No data found "
            });
            retrun;
        }
        response.status(200).send(challans);
    }).catch(error => {
        response.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        })
    });
}

//db select challan by ID
const selectChallanByID = (request, response) => {
    Challan.findById(request.params.challanId).then(challan => {
        if (!challan) {
            response.status(404).send({
                message: "No data found "
            });
            retrun;
        }
        response.status(200).send(challan);
    }).catch(error => {
        response.status(500).send({
            message: error.message || "Some error occurred while creating the Note."
        })
    });
}

exports.selectChallan = selectChallan;
exports.selectChallanByID = selectChallanByID;
exports.insertChallan = insertChallan;
exports.updateChallanByID = updateChallanByID;
exports.deleteChallanByID = deleteChallanByID;
