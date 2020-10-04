const express = require('express');
const router = express.Router();

const challan_controller = require('../controller/challan.controller');

router.get('/',challan_controller.selectChallan);

router.post('/',challan_controller.insertChallan);

router.get('/:challanId',challan_controller.selectChallanByID);

router.put('/:challanId',challan_controller.updateChallanByID);

router.delete('/:challanId',challan_controller.deleteChallanByID);

module.exports = router;