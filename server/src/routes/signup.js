const express = require('express');
const { CreateUser } = require('../controller/signup');

const router = express.Router();

router.post('/', CreateUser);

module.exports = router;