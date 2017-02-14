const express = require('express'),
    Routes = express.Router(),
    RegisterRouter = require('./Register/Register.Student.js'),
    LoginRouter = require('./Login/Login.Student'),
    ForgotPasswordRouter = require('./ForgotPassword/ForgotPassword.Student'),
    ChangePasswordRouter = require('./ChangePassword/ChangePassword.Student');

Routes.post('/register/student', RegisterRouter);

Routes.post('/login/student', LoginRouter);

Routes.post('/forgot-password/student', ForgotPasswordRouter);

Routes.post('/change-password/student', ChangePasswordRouter);

module.exports = Routes;