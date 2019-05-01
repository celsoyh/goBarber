const { User } = require('../models');

class RegisterController {
  create(req, res) {
    return res.render('auth/signup');
  }

  async store(req, res) {
    console.log('req', req);
    const { filename: avatar } = req.file;
    await User.create({ ...req.body, avatar });

    return res.redirect('/signup');
  }
}

module.exports = new RegisterController();
