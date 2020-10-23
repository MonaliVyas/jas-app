const Joi = require('joi');

const schema = Joi.object().keys({
    ItemNo: Joi.string().required().messages({

    }),
    Name: Joi.string().required().messages({

    }),
    DrawingNo: Joi.string().required().messages({

    }),
    PartCode: Joi.string().required().messages({

    }),
    Material: Joi.string().required().messages({

    }),
    Price: Joi.string().required().messages({

    }),
    ValidTo: Joi.date(),
    ValidFrom: Joi.date(),
    CreatedBy: Joi.number()
});

module.exports = schema;