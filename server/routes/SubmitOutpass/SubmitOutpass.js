const express = require('express'),
	Promise = require('bluebird'),
	SubmitLeaveRouter = express.Router(),
	ValidateRequestData = require('../../middlewares/ValidateRequestData/ValidateRequestData'),
	VerifyToken = require('../../middlewares/VerifyToken/VerifyToken'),
	StoreOutpass = require('../../middlewares/StoreOutpass/StoreOutpass');

SubmitLeaveRouter.post('*',
	(req, res, next) => {
		ValidateRequestData({
			_id: req.body._id,
			phoneno: req.body.phoneno,
			address: req.body.address,
			from: req.body.from,
			to: req.body.to,
			name: req.body.name,
			date: req.body.date,
			branch: req.body.branch,
			year: req.body.year,
			semester: req.body.semester,
			roomno: req.body.roomno,
			_deviceid: req.headers._deviceid,
			_apikey: req.headers._apikey,
			accesstoken: req.headers.accesstoken
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
		VerifyToken({
			_id: req.body._id,
			token: req.headers.accesstoken,
			type: 'accesstoken',
			_deviceid: req.headers._deviceid
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
			outpass = db.collection('pendingOutpass');

		StoreOutpass({
			_id: req.body._id,
			phoneno: req.body.phoneno,
			address: req.body.address,
			from: req.body.from,
			to: req.body.to,
			name: req.body.name,
			date: req.body.date,
			branch: req.body.branch,
			year: req.body.year,
			semester: req.body.semester,
			roomno: req.body.roomno,
			_deviceid: req.headers._deviceid,
		}, outpass)
			.then(result => {
				res.send(JSON.stringify(result));
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});
	});

module.exports = SubmitLeaveRouter;