const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const CustomError = require('../../global/CustomError');
const Challan = require('../model/challan_db.model');
const Challan_joi = require('../model/challan_joi.model');

//db insert challan
const insertChallan = (request, response, next) => {
    try {
        let reqBody = request.body;
        let challan = new Challan(reqBody);
        let result = Challan_joi.validate(reqBody, { abortEarly: false });

        if (!result.error) {
            challan.save().then(data => {
                response.status(200).send({ message: "Record inserted successfully" })
            }).catch(err => {
                next(new CustomError(err, 500, 'Some error occured while inserting the challan'));
                });
        } else {
            next(new CustomError('', 400, result));
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db update challan
const updateChallanByID = (request, response, next) => {
    try {
        let reqBody = request.body;
        let result = Challan_joi.validate(reqBody, { abortEarly: false });
        let challanId = request.params.challanId;

        if (!result.error) {
            Challan.update({ _id: challanId }, {
                $set: reqBody
            }).then(data => {
                if (data) {
                    response.status(200).send({ message: "Record updated successfully." });
                }
                else next(new CustomError('', 404, 'Challan not found'))
            }).catch(err => {
                next(new CustomError(err, 500, 'Some error occured while updating the challan'));
            });
        } else {
            next(new CustomError('', 400, result));
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db delete challan
const deleteChallanByID = (request, response, next) => {
    try {
        let challanId = request.params.challanId

        Challan.deleteOne({ _id: challanId }).then(data => {
            if (data) {
                response.status(200).send({ message: "Record deleted successfully" });
            }
            else next(new CustomError('', 404, 'Challan not found')) 
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while deleting the challan"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db select challan
const selectChallan = (request, response, next) => {
    try {
        Challan.find().then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'No data found'))
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the challans"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

//db select challan by ID
const selectChallanByID = (request, response, next) => {
    // abc();
    try {
        let challanId = request.params.challanId;

        Challan.findById(request.params.challanId).then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'Challan not found'));
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the challan"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

exports.selectChallan = selectChallan;
exports.selectChallanByID = selectChallanByID;
exports.insertChallan = insertChallan;
exports.updateChallanByID = updateChallanByID;
exports.deleteChallanByID = deleteChallanByID;