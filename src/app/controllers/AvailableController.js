const moment = require('moment');
const { Appointment } = require('../models');
const { Op } = require('sequelize');

class AvailableController {
  async index(req, res) {
    const date = moment(parseInt(req.query.date));
    const { provider } = req.params;

    const appointments = await Appointment.findAll({
      where: {
        provider_id: provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    });

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00'
    ];

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':');
      const timeValue = date
        .hour(hour)
        .minute(minute)
        .second(0);

      return {
        time,
        value: timeValue.format(),
        available:
          timeValue.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
      };
    });

    return res.render('available/index', { available });
  }
}

module.exports = new AvailableController();
