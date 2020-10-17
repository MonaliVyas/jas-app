const express = require('express');
const router = express.Router();

const user_controller = require('../controller/user.controller');

router.post('/', user_controller.insertUser);

router.get('/:userId', user_controller.selectUserByID);

router.get('/', user_controller.selectUser);

router.put('/:userId', user_controller.updateUserByID);

router.delete('/:userId', user_controller.deleteUserByID);

module.exports = router;