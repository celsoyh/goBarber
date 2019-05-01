class DashboardController {
  create(req, res) {
    return res.render('app/dashboard');
  }
  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie('gobarbersession');
      return res.redirect('/');
    });
  }
}

module.exports = new DashboardController();
