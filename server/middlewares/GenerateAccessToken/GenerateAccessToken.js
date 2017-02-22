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
					_deviceid: _deviceid,
					message: "Login Successful",
					data: {
						accesstoken: accesstoken,
						_id: _id
					}
				});
			} else {
				reject({
					error: 'E108',
					message: "Error Occured, Please Retry",
					_deviceid: _deviceid,
					data: {
						_id: _id
					}
				});
			}
		});
		redisClient.expire(_deviceid, EXPIRETIME);
	});
};