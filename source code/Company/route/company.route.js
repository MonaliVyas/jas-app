const express = require('express');
const router = express.Router();

const company_controller = require('../controller/company.controller');

router.get('/',company_controller.selectCompany);

router.post('/',company_controller.insertCompany);

router.get('/:companyId',company_controller.selectCompanyByID);

router.put('/:companyId',company_controller.updateCompanyByID);

router.delete('/:companyId',company_controller.deleteCompanyByID);

module.exports = router;
