const passport = require('passport');

exports.showLoginForm = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.login = async(req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
      if(authError) {
          console.error(authError);
          return next(authError);
      }
      if(!user){
          return res.redirect(`/?loginError=${info.message}`);
      }
      return req.login(user, (loginError) => {
          if(loginError){
              console.error(loginError);
              return next(loginError);
          }
          return res.redirect('/');
      });
  })(req, res, next); //미들웨어 내의 미들웨어에는 (req,res,next)를 붙이라고 함.
}

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};