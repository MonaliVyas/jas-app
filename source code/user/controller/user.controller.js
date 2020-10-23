const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const CustomError = require('../../global/CustomError');
const User = require('../model/user_db.model');
const User_Joi = require('../model/user_joi.model');

//db insert user
const insertUser = (request, response, next) => {
    try {
        let reqBody = request.body;
        let user = new User(reqBody);
        let result = User_Joi.validate(reqBody, { abortEarly: false });

        if (!result.error) {
            user.save().then(data => {
                response.status(200).send({ message: "Record inserted successfully" })
            }).catch(err => {
                next(new CustomError(err, 500, 'Some error occured while inserting the user'));
                });
        } else {
            next(new CustomError('', 400, result));
        }
    } catch(err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db update user
const updateUserByID = (request, response, next) => {
    try {
        let reqBody = request.body;
        let result = User_Joi.validate(reqBody, { abortEarly: false });
        let userId = request.params.userId;

        if (!result.error) {
            User.update({ _id: userId }, {
                $set: reqBody
            }).then(data => {
                if (data) {
                    response.status(200).send({ message: "Record updated successfully." });
                }
                else next(new CustomError('', 404, 'User not found'))
            }).catch(err => {
                next(new CustomError(err, 500, 'Some error occured while updating the user'));
            });
        } else {
            next(new CustomError('', 400, result));
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db delete user
const deleteUserByID = (request, response, next) => {
    try {
        let userId = request.params.userId

        User.deleteOne({ _id: userId }).then(data => {
            if (data) {
                response.status(200).send({ message: "Record deleted successfully" });
            }
            else next(new CustomError('', 404, 'User not found')) 
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while deleting the user"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db select user
const selectUser = (request, response, next) => {
    try {
        User.find().then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'No data found'))
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the users"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

//db select user by ID
const selectUserByID = (request, response, next) => {
    // abc();
    try {
        let userId = request.params.userId;

        User.findById(request.params.userId).then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'User not found'));
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the user"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

exports.insertUser = insertUser;
exports.selectUser = selectUser;
exports.updateUserByID = updateUserByID;
exports.deleteUserByID = deleteUserByID;
exports.selectUserByID = selectUserByID;
