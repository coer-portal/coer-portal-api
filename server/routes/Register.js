const express = require('express'),
	RegisterRouter = express.Router(),
	ValidateDeviceID = require('../middlewares/ValidateDeviceID/ValidateDeviceID'),
	ValidateRequestData = require('../middlewares/ValidateRequestData/ValidateRequestData');

/*
 * Check for Device ID, If one exists continue with it and if it doesn't exists then create a new ID
 *
 * Validate The following data and if any data is invalid return a E101 error.
 * Check Documentation for help with error codes
 * Data To Validate: ID, phoneno, fatherno, Date of Birth, Location, password and APIKEY
 *
 * Check if the user already exists in Database
 * If the user exists return E102
 * If it's a new user then proceed with registration
 *
 *
 */

RegisterRouter.post('*',
	(req, res, next) => {
		req._deviceid = ValidateDeviceID(req.headers._deviceid);
		next();
	},
	(req, res, next) => {
		const _id = req.body._id,
			phoneno = req.body.phoneno,
			fatherno = req.body.fatherno,
			_dob = req.body._dob,
			location = req.body.location,
			password = req.headers.password,
			_apikey = req.headers._apikey;

		let ValidationResult = ValidateRequestData({
			_id: _id,
			phoneno: phoneno,
			fatherno: fatherno,
			_dob: _dob,
			location: location,
			password: password,
			_apikey: _apikey
		});
		if (ValidationResult === true) {
			next();
		} else {
			res.send(ValidationResult);
		}
	},
	(req, res, next) => {
		res.send("hoho");
	});

module.exports = RegisterRouter;