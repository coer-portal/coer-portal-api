const crypto = require('crypto');

module.exports = function (_deviceid) {
	if (_deviceid && _deviceid != "null" && _deviceid != "undefined") {
		return _deviceid;
	} else {
		return crypto.randomBytes(14).toString('hex');
	}
};