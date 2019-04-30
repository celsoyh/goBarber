const express = require("express");
const routes = express.Router();
const RegisterController = require("./controllers/RegisterController");

routes.get("/", RegisterController.create);

module.exports = routes;
