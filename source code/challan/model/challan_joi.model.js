const Joi = require('joi');

const schema = Joi.object().keys({
    ChallanNo: Joi.number().required().messages({

    }),
    CompanyId: Joi.string().required().messages({

    }),
    Date: Joi.date().required().messages({

    }),
    Items: Joi.array().items({
        ItemId: Joi.string().required().messages({
    
        }),
        Price: Joi.number().required().messages({
    
        }),
        Qty: Joi.number().required().messages({
    
        })  
    }),
    CreatedBy: Joi.number(),
    CreatedOn: Joi.date()
});

module.exports = schema;
