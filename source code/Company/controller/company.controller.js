const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Joi = require('joi');

const Company = require('../model/company.model');

const schema = Joi.object().keys({
    Name: Joi.string().min(2).max(255).required().messages({
        'string.min': `Name must be at least 2 characters long`,
		'string.max': `Name must be less than or equal to 255 characters long`,
		'string.required': `Name is required`
    }),
    CompanyCode: Joi.string().min(2).max(10).allow("").messages({
        'string.min': `Company code must be at least 2 characters long`,
		'string.max': `Company code must be less than or equal to 10 characters long`,
		'string.required': `Company code is required`
    }),
    Email: Joi.string().regex(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/).max(255).required().messages({
        'string.pattern.base': `Invalid email address`,
        'string.max': `Email must be less than or equal to 255 characters long`,
        'string.required': `Email address is required`
    }),
    Phone: Joi.string().regex(/^[0-9]{10,10}$/).required().messages({
        'string.pattern.base': `Invalid phone number`,
        'string.required': `Phone number is required`
    }),
    Address: Joi.string().max(255).allow("").messages({
        'string.max': `Address must be less than or equal to 255 characters long`
    }),
    GSTIN: Joi.string().regex(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/).required().messages({
        'string.pattern.base': `Invalid GSTIN`,
        'string.required': `GSTIN is required`
    }),
    CreatedBy: Joi.number(),
    CreatedDate: Joi.date(),
    ModifiedBy: Joi.number(),
	ModifiedDate: Joi.date()
})
//db insert company
const insertCompany = (request, response) => {
    // const company = new Company({
    //     name: 'KHS',
    //     code: '123',
    //     email: 'kvyas@khs.com',
    //     phone: 1234567890,
    //     address: 'Motera',
    //     GSTNo: '123456789asdrfgty',
    //     ValidTo: '20/12/2019',
    //     ValidFrom: '22/12/2019',
    //     CreatedBy: 1,
    //     CreatedOn: '20/12/2019'
    // });
    
    try{
        const result = schema.validate(request.body,  {abortEarly: false});
        console.log(result);
        const company = new Company(request.body);
        console.log(company);
        if (result){
            // console.log(result);
            response.status(500).send({
                message: result
            })
            // company.save().then(result => {
            //     response.status(200).send({
            //         message: "Record inserted successfully"
            //     })
            // }).catch(error => {
            //     response.status(500).send({
            //         message: error.message || "Some error occured while inserting the record."
            //     })
            // })
        }else{
            console.log(result);
        }
    }catch(ex){
console.log(result);
    }

    // company.save().then(result => {
    //     response.status(200).send({
    //         message: "Record inserted successfully"
    //     })
    // }).catch(error => {
    //     response.status(500).send({
    //         message: error.message || "some error occured while inserting the record."
    //     })
    // })
}

//db update company
const updateCompanyByID = (request, response) => {
    Company.update({ _id: request.params.companyId}, {
        $set: {
            name: 'Inspiron',
            code: '111',
            email: 'abc@insp.com',
            phone: 1234567890,
            address: 'xxx',
            GSTNo: '223456789asdrfgty',
            ValidTo: '20/12/2019',
            ValidFrom: '22/12/2019',
            CreatedBy: 1,
            CreatedOn: '20/12/2019'
        }
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

//db delete company
const deleteCompanyByID = (request, response) => {
    Company.deleteOne({_id: request.params.companyId}).then(result => {
        response.status(200).send({
            message: "Record deleted successfully"
        })
    }).catch(error => {
        response.status(500).send({
            message: error.message || "some error occured while deleting the record."
        })
    });
}

//db select company
const selectCompany = (request, response) => {
    Company.find().then(companys => {
        if (!companys) {
            response.status(404).send({
                message: "No data found "
            });
            retrun;
        }
        response.status(200).send(companys);
    }).catch(error => {
        response.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        })
    });
}

//db select company by ID
const selectCompanyByID = (request, response) => {
    Company.findById(request.params.companyId).then(company => {
        if (!company) {
            response.status(404).send({
                message: "No data found "
            });
            retrun;
        }
        response.status(200).send(company);
    }).catch(error => {
        response.status(500).send({
            message: error.message || "Some error occurred while creating the Note."
        })
    });
}


exports.selectCompany = selectCompany;
exports.insertCompany = insertCompany;
exports.selectCompanyByID = selectCompanyByID;
exports.updateCompanyByID = updateCompanyByID;
exports.deleteCompanyByID = deleteCompanyByID;