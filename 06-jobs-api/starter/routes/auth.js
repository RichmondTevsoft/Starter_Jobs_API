const express = require('express');
const router = express.Router();
 

//Import your controllers
const {login, register} = require('../controllers/auth');
const { model } = require('mongoose');

//Register router
router.post('/register', register);

//Login router
router.post('/login', login);

module.exports = router