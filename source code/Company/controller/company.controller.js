const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const CustomError = require('../../global/CustomError');
const Company = require('../model/company_db.model');
const Company_joi = require('../model/company_joi.model');

//db insert company
const insertCompany = (request, response, next) => {
    try {
        let reqBody = request.body;
        let company = new Company(reqBody);
        let result = Company_joi.validate(reqBody, { abortEarly: false });

        if (!result.error) {
            company.save().then(data => {
                response.status(200).send({ message: "Record inserted successfully" })
            }).catch(err => {
                next(new CustomError(err, 500, 'Some error occured while inserting the company'));
                });
        } else {
            next(new CustomError('', 400, result));
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db update company
const updateCompanyByID = (request, response, next) => {
    try {
        let reqBody = request.body;
        let result = Company_joi.validate(reqBody, { abortEarly: false });
        let companyId = request.params.companyId;

        if (!result.error) {
            Company.update({ _id: companyId }, {
                $set: reqBody
            }).then(data => {
                if (data) {
                    response.status(200).send({ message: "Record updated successfully." });
                }
                else next(new CustomError('', 404, 'Company not found'))
            }).catch(err => {
                next(new CustomError(err, 500, 'Some error occured while updating the company'));
            });
        } else {
            next(new CustomError('', 400, result));
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db delete company
const deleteCompanyByID = (request, response, next) => {
    try {
        let companyId = request.params.companyId

        Company.deleteOne({ _id: companyId }).then(data => {
            if (data) {
                response.status(200).send({ message: "Record deleted successfully" });
            }
            else next(new CustomError('', 404, 'Company not found')) 
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while deleting the company"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db select company
const selectCompany = (request, response, next) => {
    try {
        Company.find().then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'No data found'))
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the companies"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

//db select company by ID
const selectCompanyByID = (request, response, next) => {
    // abc();
    try {
        let companyId = request.params.companyId;

        Company.findById(request.params.companyId).then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'Company not found'));
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the company"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

exports.selectCompany = selectCompany;
exports.insertCompany = insertCompany;
exports.selectCompanyByID = selectCompanyByID;
exports.updateCompanyByID = updateCompanyByID;
exports.deleteCompanyByID = deleteCompanyByID;