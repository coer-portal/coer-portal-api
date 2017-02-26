const express = require('express'),
	Promise = require('bluebird'),
	RegisterRouter = express.Router(),
	ValidateDeviceID = require('../../middlewares/ValidateDeviceID/ValidateDeviceID'),
	ValidateRequestData = require('../../middlewares/ValidateRequestData/ValidateRequestData'),
	// VerifyID = require('../../middlewares/VerifyID/VerifyID'),
	CheckExistence = require('../../middlewares/CheckExistence/CheckExistence'),
	StorePassword = require('../../middlewares/StorePassword/StorePassword'),
	StoreUser = require('../../middlewares/StoreUser/RegisterUser');

RegisterRouter.post('*',
	(req, res, next) => {
		req._deviceid = ValidateDeviceID(req.headers._deviceid);
		next();
	},
	(req, res, next) => {
		ValidateRequestData({
			_id: req.body._id,
			name: req.body.name,
			phoneno: req.body.phoneno,
			password: req.headers.password,
			_apikey: req.headers._apikey,
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
		const db = req.app.locals.db,
			wardenRecord = db.collection('wardenRecord'),
			passwordVault = db.collection('passwordVault');

		CheckExistence({_id: req.body._id, _deviceid: req._deviceid}, wardenRecord, passwordVault)
			.then(result => {
				if (result.error == 0) {
					next();
				} else {
					res.send(JSON.stringify(result));
				}
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});

	},
	// (req, res, next) => {
	// 	VerifyID(req.body._id)
	// 		.then(result => {
	// req.StudentData = {
	// 	name: result.data.name,
	// 	attendance: result.data.attendance,
	// 	attenLastUpdatedOn: result.data.attenLastUpdatedOn
	// };
	// next();
	// }
	// )
	// .catch(error => {
	// 		Invalid ID
	// if (error.error === "E102") {
	// 	res.send(JSON.stringify({
	// 		_deviceid: req._deviceid,
	// 		error: error.error,
	// 		message: error.message
	// 	}));
	// } else {
	// 	Internal Server Error
	// res.send(JSON.stringify({
	// 	_deviceid: req._deviceid,
	// 	error: error.error,
	// 	errorDetail: error.message,
	// 	message: "Internal Server Error"
	// }));
	// }
	// }
	// );
	// },
	(req, res, next) => {
		const db = req.app.locals.db,
			passwordVault = db.collection('passwordVault');

		StorePassword({
			password: req.headers.password,
			_id: req.body._id,
			_deviceid: req._deviceid
		}, passwordVault)
			.then(resolve => {
				if (resolve.error == 0) {
					next();
				}
			}).catch(error => {
			res.send(JSON.stringify({
				error: error.error,
				message: error.message
			}));
		});
	},
	(req, res, next) => {
		const db = req.app.locals.db,
			wardenRecord= db.collection('wardenRecord');

		StoreUser({
			_id: req.body._id,
			phoneno: req.body.phoneno,
			name: req.body.name,
			user_type: "warden"
		}, wardenRecord)
			.then(result => {
				res.send(JSON.stringify(result));
			})
			.catch(error => {
				res.send(JSON.stringify(error));
			});

	}
);

module.exports = RegisterRouter;