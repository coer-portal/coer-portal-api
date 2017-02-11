const crypto = require('crypto');

module.exports = function (Data, redisClient) {
	const {_id, _deviceid} = Data,
		accesstoken = crypto.randomBytes(30).toString('hex'),
		EXPIRETIME = 60;
	// TODO: Promisify
	return new Promise((resolve, reject) => {
		redisClient.hmset(_deviceid, {
			_id: _id,
			accesstoken: accesstoken
		}, (err, status) => {
			if (err) {
				throw err;
			} else {
				if (status == "OK") {
					resolve({
						error: 0,
						accesstoken: accesstoken,
						data: {
							_id: _id,
							_deviceid: _deviceid
						}
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
			}
		});
		redisClient.expire(_deviceid, EXPIRETIME);
	});
};