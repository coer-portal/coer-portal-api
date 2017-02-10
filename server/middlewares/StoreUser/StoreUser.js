module.exports = function (DataToStore, studentRecord) {
	const {_id, phoneno, fatherno, location, _dob, _deviceid, name} = DataToStore;
	return new Promise((resolve, reject) => {
		studentRecord.insertOne({
			_id: _id,
			phoneno: phoneno,
			fatherno: fatherno,
			location: location,
			_dob: _dob
		}, (err, result) => {
			if (err) {
				throw err;
			} else {
				if(result.insertedCount == 1) {
					resolve({
						error: 0,
						message: 'Successfully Created Record',
						_deviceid: _deviceid,
						data: {
							_id: _id,
							name: name
						}
					});
				} else {
					reject({
						error: 'E104',
						message: "Errored in Storing Record to Database"
					});
				}
			}
		});
	});
};