const Joi = require('joi');

const schema = Joi.object().keys({
    CompanyName: Joi.string().min(2).max(300).required().messages({
        'string.min': `Company name must be at least 2 characters long`,
        'string.max': `Company name must be less than or equal to 300 characters long`,
        'string.required': `Company name is required`
    }),
    CompanyCode: Joi.string().regex(/^([A-Z]{3-10})$/).required().messages({
        'string.pattern.base': `Invalid Company Code`,
        'string.max': `Company Code must be between 3 to 15 characters long`,
        'string.required': `Company Code is required`
    }),
    CompanyEmail: Joi.string().regex(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/).max(255).required().messages({
        'string.pattern.base': `Invalid email address`,
        'string.max': `Email must be less than or equal to 255 characters long`,
        'string.required': `Email address is required`
    }),
    CompanyPhone: Joi.string().required().messages({

    }),
    CompanyAddress: Joi.string().required().messages({

    }),
    GSTIN: Joi.string().regex(/^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/).required().messages({
        'string.pattern.base': `Invalid GSTIN`,
        'string.max': `GSTIN must be equal to 15 characters long`,
        'string.required': `GSTIN is required`
    }),
    CreatedBy: Joi.number(),
    CreatedDate: Joi.date(),
    ModifiedBy: Joi.number(),
    ModifiedDate: Joi.date(),
});

module.exports = schema;