const request = require('request');

module.exports = function (_id) {
	let Response = {
		initialize: function () {
			request.post({url: 'http://coer.ac.in/atten.php', form: {coerid: _id}}, function (err, httpResponse, body) {
				if (!err && httpResponse.statusCode === 200 && body.indexOf('Invalid COER ID') == -1) {
					this.message = {
						error: 0,
						data: {
							name: body.split("<h3>")[1].split("</h3>")[0].split("Mr/Ms ")[1].split(" have")[0] || null,
							attendance: parseFloat(body.split("have ")[1].split("%")[0]) || null,
							attenLastUpdatedOn: body.split("<p>")[1].split("</p>")[0].split(" Update ")[1] || null,
						}
					};

					console.log(this.message);
				} else {
					this.message = {
						error: 'E500',
						message: err.message || "Invalid ID"
					};
				}
			});
			return Response.message;
		},
		message: {}
	};
	Response.initialize();

};

