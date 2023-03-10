const express = require('express');
const passport = require('passport');
const { isNotLoggedIn } = require('./logged');
const { showLoginForm, login, logout } = require('../controllers/authController');

const router = express.Router();

router.get('/login', showLoginForm);

//로그인 라우터에서 post 요청이 왔을 경우
router.post('/login', isNotLoggedIn, login);

router.get('/kakao', isNotLoggedIn, passport.authenticate('kakao'));

router.get('/kakao/callback', isNotLoggedIn, passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

router.get('/google', isNotLoggedIn, passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));

router.get( '/google/callback',isNotLoggedIn,
    passport.authenticate('google', {
        failureRedirect: '/',
    }), (req, res) => {
        res.redirect('/');
});

router.get('/logout', logout);

module.exports = router;