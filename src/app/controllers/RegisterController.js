const { User } = require("../models");

class RegisterController {
  create(req, res) {
    return res.render("auth/signup");
  }

  async store(req, res) {
    await User.create(req.body);

    return res.redirect("/signup");
  }
}

module.exports = new RegisterController();
