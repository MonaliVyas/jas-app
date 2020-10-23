const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const CustomError = require('../../global/CustomError');
const Bill = require('../model/bill_db.model');
const Bill_joi = require('../model/bill_joi.model');

//db insert bill
const insertBill = (request, response, next) => {
    try {
        let reqBody = request.body;
        let bill = new Bill(reqBody);
        let result = Bill_joi.validate(reqBody, { abortEarly: false });

        if (!result.error) {
            bill.save().then(data => {
                response.status(200).send({ message: "Record inserted successfully" })
            }).catch(err => {
                next(new CustomError(err, 500, 'Some error occured while inserting the bill'));
                });
        } else {
            next(new CustomError('', 400, result));
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db update bill
const updateBillByID = (request, response, next) => {
    try {
        let reqBody = request.body;
        let result = Bill_joi.validate(reqBody, { abortEarly: false });
        let billId = request.params.billId;

        if (!result.error) {
            Bill.update({ _id: billId }, {
                $set: reqBody
            }).then(data => {
                if (data) {
                    response.status(200).send({ message: "Record updated successfully." });
                }
                else next(new CustomError('', 404, 'Bill not found'))
            }).catch(err => {
                next(new CustomError(err, 500, 'Some error occured while updating the bill'));
            });
        } else {
            next(new CustomError('', 400, result));
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db delete bill
const deleteBillByID = (request, response, next) => {
    try {
        let billId = request.params.billId

        Bill.deleteOne({ _id: billId }).then(data => {
            if (data) {
                response.status(200).send({ message: "Record deleted successfully" });
            }
            else next(new CustomError('', 404, 'Bill not found')) 
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while deleting the bill"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db select bill
const selectBill = (request, response, next) => {
    try {
        Bill.find().then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'No data found'))
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the bills"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

//db select bill by ID
const selectBillByID = (request, response, next) => {
    // abc();
    try {
        let billId = request.params.billId;

        Bill.findById(request.params.billId).then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'Bill not found'));
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the bill"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

exports.insertBill = insertBill;
exports.updateBillByID = updateBillByID;
exports.deleteBillByID = deleteBillByID;
exports.selectBill = selectBill;
exports.selectBillByID = selectBillByID;