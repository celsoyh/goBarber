const express = require('express');
const routes = express.Router();
const RegisterController = require('./controllers/RegisterController');
const LoginController = require('./controllers/LoginController');
const DashboardController = require('./controllers/DashboardController');
const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

routes.get('/signup', RegisterController.create);
routes.post('/signup', RegisterController.store);

routes.get('/', guestMiddleware, LoginController.create);
routes.post('/signin', guestMiddleware, LoginController.store);

routes.use('/app', authMiddleware);

routes.get('/app/dashboard', DashboardController.create);

module.exports = routes;
