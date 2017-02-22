const bcrypt = require('bcrypt'),
	Promise = require('bluebird');

module.exports = function (PasswordObject, passwordVault) {
	const {_id, password, _deviceid} = PasswordObject;

	return new Promise((resolve, reject) => {
		passwordVault.findOne({
			_id: _id
		}, (err, result) => {
			bcrypt
				.compare(password, result.passwordHash)
				.then(result => {
					if (result) {
						resolve({
							error: 0,
							message: "Correct Password, Please Proceed",
							_deviceid: _deviceid,
							data: {
								_id: _id
							}
						});
					} else {
						reject({
							error: 'E107',
							message: "Wrong Password",
							_deviceid: _deviceid,
							data: {
								_id: _id
							}
						});
					}
				});
		});
	});
};