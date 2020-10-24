const Joi = require('joi');

const schema = Joi.object().keys({
    BillNo: Joi.number().required().messages({

    }),
    ChallanNo: Joi.number().equal(Joi.ref(BillNo)).required().messages({
        
    }),
    ChallanNo: Joi.number().required().valid(Joi.ref(BillNo)).options({
        language: {
            any: {
              allowOnly: '!!initial amount do not match',
            }
          } 
    }).messages({

    }),
    BillAmount: Joi.number().required().messages({

    }),
    CreatedBy: Joi.number(),
    CreatedOn: Joi.date()
});

module.exports = schema;