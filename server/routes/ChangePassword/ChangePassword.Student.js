const express = require('express'),
	Promise = require('bluebird'),
	ChangePasswordRouter = express.Router(),
	ValidateDeviceID = require('../../middlewares/ValidateDeviceID/ValidateDeviceID'),
	ValidateRequestData = require('../../middlewares/ValidateRequestData/ValidateRequestData'),
	VerifyResetToken = require('../../middlewares/VerifyResetToken/VerifyResetToken'),
	UpdatePassword = require('../../middlewares/UpdatePassword/UpdatePassword');


ChangePasswordRouter.post('*',
	(req, res, next) => {
		req._deviceid = ValidateDeviceID(req.headers._deviceid);
		next();
	},
	(req, res, next) => {
		ValidateRequestData({
			_id: req.body._id,
			resettoken: req.headers.resettoken,
			password: req.headers.password
		})
			.then(resolve => {
				if (resolve.error == 0) {
					next();
				}
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});
	},
	(req, res, next) => {
		const redisClient = req.app.locals.redisClient;

		VerifyResetToken({
			_id: req.body._id,
			_deviceid: req.headers._deviceid,
			resettoken: req.headers.resettoken
		}, redisClient)
			.then(result => {
				if (result.error == 0) {
					next();
				}
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});

	},
	(req, res, next) => {
		const db = req.app.locals.db,
			passwordVault = db.collection('passwordVault');

		UpdatePassword({
			_id: req.body._id,
			_deviceid: req.headers._deviceid,
			password: req.headers.password
		}, passwordVault)
			.then(result => {
				res.send(JSON.stringify(result));
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});
	});


module.exports = ChangePasswordRouter;