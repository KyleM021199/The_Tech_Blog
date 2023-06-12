const withAuth = (req, res, next) => {
    // redirects to the login screen if not login else it continues on
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;