const express = require('express'),
	Promise = require('bluebird'),
	LoginRouter = express.Router(),
	ValidateDeviceID = require('../../middlewares/ValidateDeviceID/ValidateDeviceID'),
	ValidateRequestData = require('../../middlewares/ValidateRequestData/ValidateRequestData'),
	CheckExistence = require('../../middlewares/CheckExistence/CheckExistence'),
	VerifyPassword = require('../../middlewares/VerifyPassword/VerifyPassword'),
	GenerateAccessToken = require('../../middlewares/GenerateAccessToken/GenerateAccessToken');

LoginRouter.post('*',
	(req, res, next) => {
		/*
		 * Validate Device ID
		 * If one exists, Go ahead with that, If it doesn't exists create one
		 */
		req._deviceid = ValidateDeviceID(req.headers._deviceid);
		next();
	},
	(req, res, next) => {
		//	Validate Data in Request
		ValidateRequestData({
			_id: req.body._id,
			password: req.headers.password,
			_apikey: req.headers._apikey,
		})
			.then(resolve => {
				if (resolve.error == 0) {
					next();
				}
			}).catch(error => {
			res.send(JSON.stringify(error));
		});
	},
	(req, res, next) => {
		const db = req.app.locals.db,
			wardenRecord = db.collection('wardenRecord'),
			passwordVault = db.collection('passwordVault');

		CheckExistence({_id: req.body._id, _deviceid: req._deviceid}, wardenRecord, passwordVault)
			.then(result => {
				if (result.error == 'E103') {
					next();
				} else {
					result.error = 'E111';
					res.send(JSON.stringify(result));
				}
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});
	},
	(req, res, next) => {
		const db = req.app.locals.db,
			passwordVault = db.collection('passwordVault');

		VerifyPassword({
			_id: req.body._id,
			password: req.headers.password,
			_deviceid: req._deviceid
		}, passwordVault)
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
		const redisClient = req.app.locals.redisClient,
			_id = req.body._id,
			_deviceid = req._deviceid;

		GenerateAccessToken({
			_id: _id,
			_deviceid: _deviceid,
			user_type: "warden"
		}, redisClient)
			.then(result => {
				res.send(JSON.stringify(result));
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});
	}
);


module.exports = LoginRouter;