const request = require('request'),
	Promise = require('bluebird');

module.exports = function (_id) {
	return new Promise((resolve, reject) => {
		request.post({url: 'http://coer.ac.in/atten.php', form: {coerid: _id}}, function (err, httpResponse, body) {
			if (!err && httpResponse.statusCode === 200) {
				if (body.indexOf('Invalid COER ID') == -1) {
					resolve({
						error: 0,
						data: {
							name: body.split("<h3>")[1].split("</h3>")[0].split("Mr/Ms ")[1].split(" have")[0] || null,
							attendance: parseFloat(body.split("have ")[1].split("%")[0]) || null,
							attenLastUpdatedOn: body.split("<p>")[1].split("</p>")[0].split(" Update ")[1] || null,
						}
					});
				} else {
					reject({
						error: 'E102',
						message: "Invalid ID"
					});
				}
			} else {
				reject({
					error: 'E500',
					message: err.message
				});
			}
		})
		;
	});
};

