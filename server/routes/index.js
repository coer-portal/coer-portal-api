const express = require('express'),
    Routes = express.Router(),
	RegisterRouter = require('./Register.Student');

Routes.post('/student/register', RegisterRouter);

module.exports = Routes;