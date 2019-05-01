class DashboardController {
  create(req, res) {
    return res.render('app/dashboard');
  }
}

module.exports = new DashboardController();
