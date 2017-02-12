const Promise = require('bluebird');

module.exports = function (Data, studentRecord) {
	const {_id} = Data;
	return new Promise((resolve, reject) => {
		studentRecord.findOne({_id: _id}, (err, result) => {
			if (err) throw err;
			if (result) {
				for (let key in Data) {
					if (Data.hasOwnProperty(key) && (key != "_deviceid" && Data[key] != result[key])) {
						reject({
							error: 'E101',
							data: Data
						});
					}
				}
				resolve({
					error: 0,
					message: "All good, Proceed to create a Temporary accesstoken"
				});
			} else {
				reject({
					error: 'E101',
					data: Data,
					message: "New User, Please Proceed to Registration"
				});
			}
		});
	});
};
