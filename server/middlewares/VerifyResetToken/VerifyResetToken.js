const Promise = require('bluebird');

module.exports = function (Data, redisClient) {
	const {_id, resettoken, _deviceid} = Data;

	return new Promise((resolve, reject) => {
		redisClient.hgetall(_id, (err, result) => {
			if (err) throw err;
			if (result) {
				if (result.resettoken === resettoken) {
					resolve({
						error: 0,
						message: "Reset Token is correct, Please Proceed",
						data: {
							_id: _id,
							_deviceid: _deviceid
						}
					});
				} else {
					reject({
						error: 'E109',
						message: "Reset Token Expired, Please retry",
						data: {
							_id: _id,
							_deviceid: _deviceid
						}
					});
				}
			} else {
				reject({
					error: 'E109',
					message: "Reset Token Expired, Please retry",
					data: {
						_id: _id,
						_deviceid: _deviceid
					}
				});
			}
		});
	});
};