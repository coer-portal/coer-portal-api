module.exports = function (Data, studentRecord, passwordVault) {
	const {_id, _deviceid} = Data;
	return new Promise((resolve, reject) => {
		//TODO: Promisify
		studentRecord.findOne({_id: _id}, (err, result) => {
			if (err) {
				throw err;
			} else {
				if (!result) {
					passwordVault.findOne({_id: _id}, (err, passResult) => {
						if (err) {
							throw err;
						} else {
							if (!passResult) {
								resolve({
									error: 0,
									message: "New User, Please proceed to Registration",
									data: {
										_id: _id
									}
								});
							} else {
								reject({
									error: 'E500',
									message: "Internal Server Error",
									data: {
										_id: _id,
										_deviceid: _deviceid
									}
								});
							}
						}
					});
				} else {
					resolve({
						error: 'E103',
						message: "Student ID already exists in Database",
						data: {
							_id: _id,
							_deviceid: _deviceid
						}
					});
				}
			}
		});
	});
};