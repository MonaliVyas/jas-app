const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Joi = require('joi');
const User = require('../model/user.model');
const CustomError = require('../../global/CustomError');
let DOB = new Date();
DOB.setFullYear(DOB.getFullYear() - 16);

const schema = Joi.object().keys({
    FirstName: Joi.string().min(2).max(30).required().messages({
        'string.min': `First name must be at least 2 characters long`,
        'string.max': `First name must be less than or equal to 30 characters long`,
        'string.required': `First name is required`
    }),
    LastName: Joi.string().min(2).max(30).required().messages({
        'string.min': `Last name must be at least 2 characters long`,
        'string.max': `Last name must be less than or equal to 30 characters long`,
        'string.required': `Last name is required`
    }),
    Gender: Joi.string().required().messages({
        'string.required': `Gender is required`
    }),
    DOB: Joi.date().max(DOB).required().messages({
        'date.max': `User must be 16 years old or above`,
        'date.required': `Date of birth is required`
    }),
    Email: Joi.string().regex(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/).max(255).required().messages({
        'string.pattern.base': `Invalid email address`,
        'string.max': `Email must be less than or equal to 255 characters long`,
        'string.required': `Email address is required`
    }),
    Mobile: Joi.string().regex(/^[0-9]{10,10}$/).required().messages({
        'string.pattern.base': `Invalid mobile number`,
        'string.required': `Mobile number is required`
    }),
    Role: Joi.number().required().messages({
        'string.required': `Role is required`
    }),
    IsActive: Joi.boolean(),
    CreatedBy: Joi.number(),
    CreatedDate: Joi.date(),
    ModifiedBy: Joi.number(),
    ModifiedDate: Joi.date()
});

//db insert user
const insertUser = (request, response) => {
    try {
        let reqBody = request.body;
        let user = new User(reqBody);
        let result = schema.validate(reqBody, { abortEarly: false });

        if (!result.error) {
            user.save().then(data => {
                response.status(200).send({ message: "Record inserted successfully" })
            }).catch(error => {
                next(new CustomError(err, 500, 'Some error occured while inserting the user'));
                // response.status(500).send({ message: error.message || "Some error occured while inserting the user." })
                });
        } else {
            next(new CustomError(err, 400, result));
            // response.status(400).send({ message: result })
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db update user
const updateUserByID = (request, response) => {
    try {
        let reqBody = request.body;
        let result = schema.validate(reqBody, { abortEarly: false });
        let userId = request.params.userId;

        if (!result.error) {
            User.update({ _id: userId }, {
                $set: reqBody
            }).then(data => {
                if (data) {
                    response.status(200).send({ message: "Record updated successfully." });
                }
                else next(new CustomError('', 404, 'User not found'))
                // response.status(404).send({ message: "Not found User with id " + userId });
            }).catch(error => {
                next(new CustomError(err, 500, 'Some error occured while updating the user'));
                // response.status(500).send({ message: error.message || "Error updating User with id" + userId });
            });
        } else {
            next(new CustomError(err, 400, result));
            // response.status(400).send({ message: result });
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db delete user
const deleteUserByID = (request, response) => {
    try {
        let userId = request.params.userId

        User.deleteOne({ _id: userId }).then(data => {
            if (data) {
                response.status(200).send({ message: "Record deleted successfully" });
            }
            else next(new CustomError('', 404, 'User not found')) 
            // response.status(404).send({ message: "Not found User with id " + userId });
        }).catch(error => {
            next(new CustomError(err, 500, "Some error occurred while deleting the user"));
            // response.status(500).send({ message: error.message || "Error deleting User with id " + userId })
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
            // response.status(404).send({ message: "No data found " });
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the users"));
            // response.status(500).send({ message: err.message || "Some error occurred while retrieving Users" })
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

//db select user by ID
const selectUserByID = (request, response) => {
    try {
        let userId = request.params.userId;

        User.findById(request.params.userId).then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'User not found')) 
            // response.status(404).send({ message: "Not found User with id " + userId }); 
        }).catch(error => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the user"));
            // response.status(500).send({ message: error.message || "Error retrieving User with id " + userId })
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

exports.insertUser = insertUser;
exports.selectUser = selectUser;
exports.updateUserByID = updateUserByID;
exports.deleteUserByID = deleteUserByID;
exports.selectUserByID = selectUserByID;
