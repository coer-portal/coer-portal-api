const bcrypt = require('bcrypt'),
	saltRounds = 5;

module.exports = function (Data, passwordVault) {
	const {_id, _deviceid, password} = Data;

	return new Promise((resolve, reject) => {
		bcrypt.hash(password, saltRounds)
			.then(hash => {
				passwordVault.updateOne({_id: _id}, {$set: {passwordHash: hash}},
					(err, result) => {
						if (err) throw err;
						if (result.result.ok == 1) {
							resolve({
								error: 0,
								message: "Password Changed Successfully",
								data: {
									_id: _id,
									_deviceid: _deviceid
								}
							});
						} else {
							reject({
								error: 'E110',
								message: "Error Occured in Changing Password",
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