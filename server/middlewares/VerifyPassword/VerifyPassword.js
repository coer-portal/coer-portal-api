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
							data: {
								_id: _id,
								_deviceid: _deviceid
							}
						});
					} else {
						reject({
							error: 'E107',
							message: "Wrong Password",
							data: {
								_id: _id,
								_deviceid: _deviceid
							}
						});
					}
				});
		});
	});
};