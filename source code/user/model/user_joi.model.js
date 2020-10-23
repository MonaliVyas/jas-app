const Joi = require('joi');

let DOB = new Date();
DOB.setFullYear(DOB.getFullYear() - 16);

//User Joi validation schema
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

module.exports = schema;