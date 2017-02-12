const express = require('express'),
	Routes = express.Router(),
	RegisterRouter = require('./Register/Register.Student.js'),
	LoginRouter = require('./Login/Login.Student'),
	ForgotPasswordRouter = require('./ForgotPassword/ForgotPassword.Student'),
	ChangePasswordRouter = require('./ChangePassword/ChangePassword.Student');

Routes.post('/student/register', RegisterRouter);

Routes.post('/student/login', LoginRouter);

Routes.post('/student/forgot-password', ForgotPasswordRouter);

Routes.post('/student/change-password', ChangePasswordRouter);

module.exports = Routes;