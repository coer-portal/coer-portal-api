const bcrypt = require('bcrypt'),
	saltRounds = 5;

module.exports = function (PasswordObject, passwordVault) {
	const {_id, password, _deviceid} = PasswordObject;
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, saltRounds)
			.then((hash) => {
				passwordVault.insertOne({
					_id: _id,
					passwordHash: hash
				}, (err, result) => {
					if (err) {
						throw err;
					} else {
						if (result.insertedCount > 0) {
							resolve();
						} else {
							reject({
								error: 'E105',
								message: "Errored in Storing Password to Database",
								data: {
									_id: _id,
									_deviceid: _deviceid
								}
							});
						}
					}
				});
			});
	});
};