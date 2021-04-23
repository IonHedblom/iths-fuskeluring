const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const FakeUserController = require('../controllers/FakeUserController');

router.get('/generate', auth, FakeUserController);

module.exports = router;