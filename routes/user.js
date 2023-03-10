const express = require('express');
const router = express.Router();
const { showRegisterForm, register, showLoginForm, login, logout } = require('../controllers/userController');

router.get('/register', showRegisterForm);
router.post('/register', register);
router.get('/login', showLoginForm);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
