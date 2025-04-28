// frontend/middlewares/checkAuth.js

function checkAuth(req, res, next) {
    if (req.session && req.session.isLoggedIn) {
  
      return next();
    } else {
    
      return res.redirect('/login');
    }
  }
  
  module.exports = checkAuth;
  