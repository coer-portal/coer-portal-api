module.exports = function (Data, studentRecord, passwordVault) {
	const {_id, _deviceid} = Data;
	return new Promise((resolve, reject) => {
		return FindInStudentRecord({_id, _deviceid}, studentRecord)
			.then(result => {
				if (!result.recordExists) {
					return FindInPasswordVault({_id, _deviceid}, passwordVault)
						.then(result => {
							resolve(result);
						})
						.catch(error => {
							reject(error);
						});
				}
			})
			.catch(error => {
				resolve(error);
			});
	});
};

function FindInStudentRecord({_id, _deviceid}, studentRecord) {
	return new Promise((resolve, reject) => {
		studentRecord.findOne({_id: _id}, (err, result) => {
			if (err) {
				throw err;
			}
			if (!result) {
				resolve({
					recordExists: false
				});
			} else {
				reject({
					error: 'E103',
					message: "Student ID already exists in Database",
					data: {
						_id: _id,
						_deviceid: _deviceid
					}
				});
			}
		});
	});
}
function FindInPasswordVault({_id, _deviceid}, passwordVault) {
	return new Promise((resolve, reject) => {
		passwordVault.findOne({_id: _id}, (err, passResult) => {
			if (err) {
				throw err;
			}
			if (!passResult) {
				resolve({
					error: 0,
					message: "New User, Proceed to Registration",
					data: {
						_id: _id,
						_deviceid: _deviceid
					}
				});
			} else {
				// Record Exists in studentRecord but doesn't exists in passwordVault, Serious Error!
				reject({
					error: 'E500',
					message: "Internal Server Error",
					data: {
						_id: _id,
						_deviceid: _deviceid
					}
				});
			}
		});
	});
}