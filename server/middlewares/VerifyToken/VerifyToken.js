const Promise = require('bluebird');

module.exports = function (Data, redisClient) {
	const {_id, token, _deviceid, type} = Data;
	const key = type === "resettoken" ? _id : _deviceid;
	return new Promise((resolve, reject) => {

		redisClient.hgetall(key, (err, result) => {
			if (err) throw err;
			if (result) {
				if (result.token === token) {
					resolve({
						error: 0,
						message: "Token is correct, Please Proceed",
						data: {
							_id: _id,
							_deviceid: _deviceid,
							user_type: result.user_type
						}
					});
				} else {
					reject({
						error: 'E109',
						message: "Token Expired, Please Login",
						data: {
							_id: _id,
							_deviceid: _deviceid,
							user_type: result.user_type

						}
					});
				}
			} else {
				reject({
					error: 'E109',
					message: "Token Expired, Please Login",
					data: {
						_id: _id,
						_deviceid: _deviceid,
						user_type: result.user_type
					}
				});
			}
		});
	});
};