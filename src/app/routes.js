const express = require("express");
const routes = express.Router();
const RegisterController = require("./controllers/RegisterController");

routes.get("/signup", RegisterController.create);
routes.post("/signup", RegisterController.store);

module.exports = routes;
