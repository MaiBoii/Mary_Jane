const bcrypt = require('bcryptjs');
const passport = require('passport');
const { User } = require('../models');

exports.showRegisterForm = (req, res) => {
  res.render('register');
};

exports.register = async (req, res) => {
  const { email, nickname, phonenumber, password} = req.body;
  let errors = [];
  if (!email || !nickname || !phonenumber || !password) {
    errors.push({ message: '모두 다 채워주십시오.'});
  }
  if (password.length < 6) {
    errors.push({ message: '비밀번호는 최소한 6글자는 되어야 합니다.' });
  }
  if (errors.length > 0) {
    res.render('register', { errors, username, email, password});
  } else {
    const salt = bcrypt.genSaltSync(10);
    try {
        const exUser = await User.findOne({ where: { email }});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, salt);
        await User.create({
            email,
            nickname,
            phonenumber,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
}};

exports.showLoginForm = (req, res) => {
  res.render('login');
};

exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
};
