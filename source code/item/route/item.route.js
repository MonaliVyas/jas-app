const express = require('express');
const router = express.Router();

const item_controller = require('../controller/item.controller');

router.get('/',item_controller.selectItem);

router.post('/',item_controller.insertItem);

router.get('/:itemId',item_controller.selectItemByID);

router.put('/:itemId',item_controller.updateItemByID);

router.delete('/:itemId',item_controller.deleteItemByID);

module.exports = router;