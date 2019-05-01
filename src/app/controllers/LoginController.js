const { User } = require('../models');
const flash = require('connect-flash');

class LoginController {
  create(req, res) {
    return res.render('auth/signin');
  }
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash('error', 'Usuário inválido');
      return res.redirect('/');
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha inválida');
      return res.redirect('/');
    }

    req.session.user = user;

    return res.redirect('/app/dashboard');
  }
}

module.exports = new LoginController();
