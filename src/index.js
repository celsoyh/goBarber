const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const routes = require('./app/routes');
const session = require('express-session');
const LokiStore = require('connect-loki')(session);
const flash = require('connect-flash');
class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.views();
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.static(path.resolve(__dirname, '..', 'public')));
    this.express.use(
      session({
        name: 'gobarbersession',
        secret: 'GoBarber secret key',
        resave: false,
        saveUninitialized: true,
        store: new LokiStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions.db')
        })
      })
    );
    this.express.use(flash());
  }
  views() {
    this.express.set('view engine', 'njk');

    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      autoescape: true,
      express: this.express,
      watch: true
    });
  }
  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
