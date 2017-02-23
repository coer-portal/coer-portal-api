const express = require('express'),
	PendingLeaveOutpass = express.Router(),
	ValidateRequestData = require('../../middlewares/ValidateRequestData/ValidateRequestData'),
	VerifyToken = require('../../middlewares/VerifyToken/VerifyToken'),
	SendPendingRecords = require('../../middlewares/SendPendingRecords/SendPendingRecords');

PendingLeaveOutpass.get('*',
	(req, res, next) => {
		ValidateRequestData({
			accesstoken: req.headers.accesstoken,
			_apikey: req.headers._apikey,
			_deviceid: req.headers._deviceid,
			req_for: req._for
		})
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
		const redisClient = req.app.locals.redisClient;
		VerifyToken({
			token: req.headers.accesstoken,
			type: 'accesstoken',
			_deviceid: req.headers._deviceid
		}, redisClient)
			.then(result => {
				// Handles Authorisation, Doesn't allows a Non-Warden to access data of all the students.
				if (result.error == 0 && result.data.user_type == "student") {
					next();
				} else {
					res.send(JSON.stringify({
						error: 'E400',
						message: 'Insufficient permission to access Student ' + req._for + ' Records'
					}));
				}
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});
	},
	(req, res, next) => {
		const db = req.app.locals.db;
		let pendingRecord = '';
		if (req._for == "outpass") {
			pendingRecord = db.collection('pendingOutpass');
		}
		if (req._for == "hostel") {
			pendingRecord = db.collection('pendingLeave');
		}

		SendPendingRecords({}, pendingRecord)
			.then(result => {
				res.send(JSON.stringify(result));
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});
	}
);

module.exports = PendingLeaveOutpass;