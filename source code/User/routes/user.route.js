const express = require('express');
const app=express()
const user_controller = require('../controllers/user.controller');
const router = express.Router();

router.get('/', user_controller.selectUser);

router.post('/', user_controller.insertUser);

router.get('/:userId', user_controller.selectUserByID);

router.put('/:userId', user_controller.updateUserByID);

router.delete('/:userId', user_controller.deleteUserByID);

module.exports = router;