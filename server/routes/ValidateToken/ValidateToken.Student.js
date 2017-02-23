const express = require('express'),
	ValidateTokenRouter = express.Router(),
	ValidateRequestData = require('../../middlewares/ValidateRequestData/ValidateRequestData'),
	VerifyToken = require('../../middlewares/VerifyToken/VerifyToken');


ValidateTokenRouter.get('*',
	(req, res, next) => {
		ValidateRequestData({
			_id: req._id,
			_deviceid: req.headers._deviceid,
			accesstoken: req.headers.accesstoken,
			_apikey: req.headers._apikey,
		})
			.then(resolve => {
				if (resolve.error == 0) {
					next();
				}
			}).catch(error => {
			res.send(JSON.stringify({_id: req.params['_id']}));
		});
	},
	(req, res) => {
		const redisClient = req.app.locals.redisClient;
		VerifyToken({
			_id: req._id,
			type: 'accesstoken',
			_deviceid: req.headers._deviceid,
			token: req.headers.accesstoken
		}, redisClient)
			.then(result => {
				if (result.error == 0) {
					res.send(JSON.stringify(result));
				}
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});
	});

module.exports = ValidateTokenRouter;