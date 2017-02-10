const express = require('express'),
	Promise = require('bluebird'),
	RegisterRouter = express.Router(),
	ValidateDeviceID = require('../middlewares/ValidateDeviceID/ValidateDeviceID'),
	ValidateRequestData = require('../middlewares/ValidateRequestData/ValidateRequestData'),
	VerifyID = require('../middlewares/VerifyID/VerifyID');

/*
 *
 * Check Documentation for help with error codes
 *
 * Check for Device ID, If one exists continue with it and if it doesn't exists then create a new ID
 *
 * Validate The following data and if any data is invalid return a E101 error.
 * Data To Validate: ID, phoneno, fatherno, Date of Birth, Location, password and APIKEY
 *
 * Check if the Enter ID is valid by performing a check against College Database.
 * If the ID is valid, Proceed to next step
 * else send E102 Error
 *
 * Check if the user already exists in Database
 * If the user exists return E103
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
		if (ValidationResult.error === 0) {
			next();
		} else {
			res.send(ValidationResult);
		}
	},
	(req, res, next) => {
		new Promise()

	});

module.exports = RegisterRouter;