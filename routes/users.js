const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/UserController');


router.post('/users', UserController.LoginUser);
router.get('/users', auth, UserController.GetUser);
router.patch('/users', auth, UserController.ChangeUserPassword);

module.exports = router;