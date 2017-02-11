const express = require('express'),
    Routes = express.Router(),
	RegisterRouter = require('./Register/Register.Student.js'),
	LoginRouter = require('./Login/Login.Student');

Routes.post('/student/register', RegisterRouter);

Routes.post('/student/login', LoginRouter);

module.exports = Routes;