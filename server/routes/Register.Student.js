const express = require('express'),
	Promise = require('bluebird'),
	RegisterRouter = express.Router(),
	ValidateDeviceID = require('../middlewares/ValidateDeviceID/ValidateDeviceID'),
	ValidateRequestData = require('../middlewares/ValidateRequestData/ValidateRequestData'),
	VerifyID = require('../middlewares/VerifyID/VerifyID'),
	CheckExistence = require('../middlewares/CheckExistence/CheckExistence'),
	StoreUser = require('../middlewares/StoreUser/StoreUser');

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
 * Register the User
 * If An Error Occurs Send E104 Response
 */

RegisterRouter.post('*',
	(req, res, next) => {
		req._deviceid = ValidateDeviceID(req.headers._deviceid);
		next();
	},
	(req, res, next) => {

		let ValidationResult = ValidateRequestData({
			_id: req.body._id,
			phoneno: req.body.phoneno,
			fatherno: req.body.fatherno,
			_dob: req.body._dob,
			location: req.body.location,
			password: req.headers.password,
			_apikey: req.headers._apikey
		});
		if (ValidationResult.error === 0) {
			next();
		} else {
			res.send(ValidationResult);
		}
	},
	(req, res, next) => {
		const db = req.app.locals.db,
			studentRecord = db.collection('studentRecord');

		CheckExistence(req.body._id, studentRecord)
			.then(result => {
				if (!result.error) {
					next();
				}
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});
	},
	(req, res, next) => {
		VerifyID(req.body._id)
			.then(
				(result) => {
					req.StudentData = {
						name: result.data.name,
						attendance: result.data.attendance,
						attenLastUpdatedOn: result.data.attenLastUpdatedOn
					};
					next();
				}
			)
			.catch(
				(error) => {
					// Invalid ID
					if (error.error === "E102") {
						res.send(JSON.stringify({
							_deviceid: req._deviceid,
							error: error.error,
							message: error.message
						}));
					} else {
						// Internal Server Error
						res.send(JSON.stringify({
							_deviceid: req._deviceid,
							error: error.error,
							errorDetail: error.message,
							message: "Internal Server Error"
						}));
					}
				}
			);
	},
	(req, res, next) => {
		const db = req.app.locals.db,
			studentRecord = db.collection('studentRecord');

		StoreUser({
			_id: req.body._id,
			phoneno: req.body.phoneno,
			fatherno: req.body.fatherno,
			_dob: req.body._dob,
			location: req.body.location,
			password: req.headers.password,
			_deviceid: req.headers._deviceid,
			name: req.StudentData.name
		}, studentRecord)
			.then(result => {
				res.send(JSON.stringify(result));
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});

	});

module.exports = RegisterRouter;