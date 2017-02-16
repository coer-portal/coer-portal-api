const crypto = require('crypto');

module.exports = function (Data, redisClient) {
	const {_id, _deviceid} = Data,
		accesstoken = crypto.randomBytes(20).toString('hex'),
		EXPIRETIME = 60 * 60 * 24 * 5;

	return new Promise((resolve, reject) => {
		redisClient.hmset(_deviceid, {
			_id: _id,
			token: accesstoken
		}, (err, status) => {
			if (err) throw err;
			if (status == "OK") {
				resolve({
					error: 0,
					accesstoken: accesstoken,
					message: "Login Successful",
					data: {
						_id: _id,
						_deviceid: _deviceid
					}
				});
			} else {
				reject({
					error: 'E108',
					message: "Error Occured, Please Retry",
					data: {
						_id: _id,
						_deviceid: _deviceid
					}
				});
			}
		});
		redisClient.expire(_deviceid, EXPIRETIME);
	});
};