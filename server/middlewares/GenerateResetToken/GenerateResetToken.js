const crypto = require('crypto');

module.exports = function (Data, redisClient) {
	const {_id, _deviceid} = Data,
		resettoken = crypto.randomBytes(20).toString('hex'),
		EXPIRETIME = 60 * 10;

	return new Promise((resolve, reject) => {
		redisClient.hmset(_id, {
			_deviceid: _deviceid,
			token: resettoken
		}, (err, status) => {
			if (err) throw err;
			if (status == "OK") {
				resolve({
					error: 0,
					resettoken: resettoken,
					data: {
						_id: _id,
						_deviceid: _deviceid
					},
					message: "This Token is valid only for 10 minutes"
				});
			} else {
				reject({
					error: 'E108',
					data: {
						_id: _id,
						_deviceid: _deviceid
					}
				});
			}
		});
		redisClient.expire(_id, EXPIRETIME);
	});
};