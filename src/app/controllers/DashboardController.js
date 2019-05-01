class DashboardController {
  create(req, res) {
    console.log('req.session', req.session.user);

    return res.render('app/dashboard');
  }
}

module.exports = new DashboardController();
