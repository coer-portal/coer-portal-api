
module.exports = function (_id, studentRecord) {
	return new Promise((resolve, reject) => {
		studentRecord.findOne({_id: _id}, (err, result) => {
			if (err) {
				throw err;
			} else {
				if (!result) {
					resolve({
						error: 0,
						message: "New User"
					});
				} else {
					reject({
						error: 'E103',
						message: "Student ID already exists in Database"
					});
				}
			}
		});
	});
};