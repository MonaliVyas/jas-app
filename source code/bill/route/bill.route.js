const express = require('express');
const router = express.Router();

const bill_controller = require('../controller/bill.controller');

router.get('/',bill_controller.selectBill);

router.post('/',bill_controller.insertBill);

router.get('/:billId',bill_controller.selectBillByID)

router.put('/:billId',bill_controller.updateBillByID);

router.delete('/:billId',bill_controller.deleteBillByID);

module.exports = router;