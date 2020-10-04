const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Joi = require('joi');
const User = require('../model/user.model');
let DOB = new Date();
DOB.setFullYear(DOB.getFullYear() - 16);
//db insert user
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
const insertUser = async (request, response) => {
	const user = new User(request.body);
    try{
        const result = schema.validate(user, {abortEarly: false});
            console.log(result);
			response.status(400).send({
              message: result
          })
    }catch(ex){
        response.status(500).send({
		message: ex});
    }
	console.log("Insert User");
	console.log(user);
    //  user.save().then(result => {
    //      response.status(200).send({
    //          message: "Record inserted successfully"
    //      })
    //  }).catch(error => {
    //      response.status(500).send({
    //          message: error.message || "some error occured while inserting the record."
    //      })
    //  })
}

//db update user
const updateUserByID = (request, response) => {
	console.log(request.body);
    User.update({ _id: request.params.userId}, {
        $set: request.body
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

//db delete user
const deleteUserByID = (request, response) => {
    User.deleteOne({_id: request.params.userId}).then(result => {
        response.status(200).send({
            message: "Record deleted successfully"
        })
    }).catch(error => {
        response.status(500).send({
            message: error.message || "some error occured while deleting the record."
        })
    });
}

//db select user
const selectUser = (request, response) => {
	
    User.find().then(users => {
        if (!users) {
            response.status(404).send({
                message: "No data found "
            });
            retrun;
        }
		console.log("Get all users")
        response.status(200).send(users);
    }).catch(error => {
        response.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        })
    });
}

//db select user by ID
const selectUserByID = (request, response) => {
		console.log(request.params.userId+'request.params.id')
    User.findById(request.params.userId).then(user => {
		console.log(user)
		console.log('API Select by id')
        if (!user) {
            response.status(404).send({
                message: "No data found "
            });
            retrun;
        }
        response.status(200).send(user);
    }).catch(error => {
        response.status(500).send({
            message: error.message || "Some error occurred while creating the Note."
        })
    });
}

exports.insertUser = insertUser;
exports.selectUser = selectUser;
exports.updateUserByID = updateUserByID;
exports.deleteUserByID = deleteUserByID;
exports.selectUserByID = selectUserByID;
