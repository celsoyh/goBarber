const express = require('express');
const routes = express.Router();
const RegisterController = require('./controllers/RegisterController');
const LoginController = require('./controllers/LoginController');
const DashboardController = require('./controllers/DashboardController');
const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');
const flashMsgMiddleware = require('./middlewares/flashMsgs');
const FileController = require('./controllers/FileController');
const AppointmentController = require('./controllers/AppointmentController');
const AvailableController = require('./controllers/AvailableController');
const multerConfig = require('../config/multer');
const upload = require('multer')(multerConfig);

routes.get('/files/:file', FileController.show);

routes.get('/signup', RegisterController.create);
routes.post('/signup', upload.single('avatar'), RegisterController.store);

routes.get('/', flashMsgMiddleware, guestMiddleware, LoginController.create);
routes.post('/signin', guestMiddleware, LoginController.store);

routes.use('/app', authMiddleware);

routes.get('/app/logout', LoginController.destroy);
routes.get('/app/dashboard', DashboardController.index);
routes.get('/app/new/:provider', AppointmentController.create);

routes.get('/app/available/:provider', AvailableController.index);

module.exports = routes;
