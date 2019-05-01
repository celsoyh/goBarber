const { User } = require('../models');

class LoginController {
  create(req, res) {
    return res.render('auth/signin');
  }
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('Usuário inválido');
      return res.redirect('/');
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha inválida');
      return res.redirect('/');
    }

    req.session.user = user;

    return res.redirect('/app/dashboard');
  }
}

module.exports = new LoginController();