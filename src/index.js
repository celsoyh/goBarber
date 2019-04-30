const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const routes = require("./app/routes");
class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.views();
  }

  middlewares() {
    this.express.set(express.urlencoded({ extended: false }));
    this.express.use(express.static(path.resolve(__dirname, "..", "public")));
  }
  views() {
    this.express.set("view engine", "njk");

    nunjucks.configure(path.resolve(__dirname, "app", "views"), {
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
