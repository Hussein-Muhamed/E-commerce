const express = require('express');
const { register, login, getAllUsers, getProfile } = require('../controllers/userControllers');
const { signupValidation, loginValidation } = require('../Utils/AuthValidation');
const verifyToken = require('../Utils/Token');

const router = express.Router();

//? Register
router.post('/', signupValidation, register)

//? Login
router.post('/login', loginValidation, login)

//? Get All users
router.get('/', verifyToken, getAllUsers)

//? Profile
router.get('/profile', verifyToken, getProfile)

module.exports = router