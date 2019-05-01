const express = require('express');
const routes = express.Router();
const RegisterController = require('./controllers/RegisterController');
const LoginController = require('./controllers/LoginController');
const DashboardController = require('./controllers/DashboardController');

routes.get('/signup', RegisterController.create);
routes.post('/signup', RegisterController.store);

routes.get('/', LoginController.create);
routes.post('/signin', LoginController.store);

routes.get('/app/dashboard', DashboardController.create);

module.exports = routes;
