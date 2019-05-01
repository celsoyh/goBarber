const { User, Appointment } = require('../models');
const moment = require('moment');
moment.locale('pt-br');

class DashboardController {
  async index(req, res) {
    const providers = await User.findAll({ where: { provider: true } });
    let appointments = await Appointment.findAll({
      where: { provider_id: req.session.user.id }
    });

    Promise.all(
      appointments.map(async a => {
        let user = await User.findOne({ where: { id: a.user_id } });
        let newdate = moment(parseInt(a.date.getTime())).format('LLLL');
        console.log('newdate', newdate);
        return {
          user_id: a.id,
          date: newdate,
          name: user.name,
          avatar: user.avatar
        };
      })
    ).then(appUsers => {
      return res.render('app/dashboard', { providers, appUsers });
    });
  }
}

module.exports = new DashboardController();
