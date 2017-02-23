const crypto = require('crypto');

module.exports = function (Data, redisClient) {
	const {_id, _deviceid, user_type} = Data,
		accesstoken = crypto.randomBytes(20).toString('hex'),
		EXPIRETIME = 60 * 60 * 24 * 5;

	return new Promise((resolve, reject) => {
		redisClient.hmset(_deviceid, {
			_id: _id,
			token: accesstoken,
			user_type: user_type
		}, (err, status) => {
			if (err) throw err;
			if (status == "OK") {
				resolve({
					error: 0,
					_deviceid: _deviceid,
					message: "Login Successful",
					data: {
						accesstoken: accesstoken,
						_id: _id,
						user_type: user_type
					}
				});
			} else {
				reject({
					error: 'E108',
					message: "Error Occured, Please Retry",
					_deviceid: _deviceid,
					data: {
						_id: _id,
						user_type: user_type
					}
				});
			}
		});
		redisClient.expire(_deviceid, EXPIRETIME);
	});
};