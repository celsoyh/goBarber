const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.views();
  }

  middlewares() {
    this.express.set(express.urlencoded({ extended: false }));
  }
  views() {
    this.express.set("view engines", "njk");

    nunjucks.configure(path.resolve(__dirname, "app", "views"), {
      autoescape: true,
      express: this.express,
      watch: process.env.NODE_ENV !== "development"
    });
  }
  routes() {}
}

module.exports = new App().express;
