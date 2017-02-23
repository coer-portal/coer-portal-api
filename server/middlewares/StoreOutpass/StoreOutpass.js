const Promise = require('bluebird');

module.exports = function (Data, outpass) {
	const {_id, phoneno, address, from, to, name, date, branch, year, _deviceid, roomno} = Data;
	return new Promise((resolve, reject) => {
		outpass.insertOne({
				_id: _id,
				phoneno: phoneno,
				address: address,
				from: from,
				to: to,
				name: name,
				date: date,
				branch: branch,
				year: year,
				roomno: roomno
			},
			(err, result) => {
				if (err) {
					reject({
						error: 'E120',
						message: "One Outpass is already registered with this ID"
					});
				} else {
					if (result.insertedCount == 1) {
						resolve({
							error: 0,
							_deviceid: _deviceid,
							message: "Successfully Created an Outpass for id " + _id
						});
					} else {
						reject({
							error: 'E104',
							message: 'Errored in Storing Record to Database'
						});
					}
				}
			});
	});
};