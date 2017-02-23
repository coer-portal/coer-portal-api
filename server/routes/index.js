const express = require('express'),
	Routes = express.Router(),
	RegisterRouter = require('./Register/Register.Student.js'),
	LoginRouter = require('./Login/Login.Student'),
	ForgotPasswordRouter = require('./ForgotPassword/ForgotPassword.Student'),
	ChangePasswordRouter = require('./ChangePassword/ChangePassword.Student'),
	ValidateTokenRouter = require('./ValidateToken/ValidateToken.Student'),
	SubmitOutpassRouter = require('./SubmitOutpass/SubmitOutpass');

Routes.post('/register/student', RegisterRouter);

Routes.post('/login/student', LoginRouter);

Routes.post('/forgot-password/student', ForgotPasswordRouter);

Routes.post('/change-password/student', ChangePasswordRouter);

Routes.post('/submit-outpass', SubmitOutpassRouter);

Routes.get('/validate-token/student/:_id',
	(req, res, next) => {
		req._id = req.params['_id'];
		next();
	},
	ValidateTokenRouter);

module.exports = Routes;