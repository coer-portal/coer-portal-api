const moment = require('moment');

module.exports = function (DataToValidate) {

	const ValidationScheme = {
		_id: ValidateNumbers(DataToValidate, "_id"),
		phoneno: ValidateNumbers(DataToValidate, "phoneno"),
		fatherno: ValidateNumbers(DataToValidate, "fatherno"),
		location: ValidateLocation(DataToValidate),
		password: ValidatePassword(DataToValidate),
		_apikey: ValidateApiKey(DataToValidate),
		_dob: ValidateDOB(DataToValidate)
	};
	let InvalidFieldArray = [];

	function ValidateData(callback) {
		for (let key in DataToValidate) {
			if (DataToValidate.hasOwnProperty(key)) {

				let ValidationResult = ValidationScheme[key];

				if (!ValidationResult) {
					InvalidFieldArray.push(key);
				}
			}
		}
		return callback();
	}

	function SendValidationResult() {
		if (InvalidFieldArray.length == 0) {
			return true;
		} else {
			return InvalidFieldArray;
		}
	}

	if (DataToValidate) {
		return ValidateData(SendValidationResult);
	} else {
		return false;
	}
};

function ValidateNumbers(DataToValidate, type) {
	if (DataToValidate && DataToValidate[type]) {
		let number = DataToValidate[type];
		if ((type == "_id" && parseInt(number).toString().length == 8) || ((type == "phoneno" || type == "fatherno") && parseInt(number).toString().length == 10)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function ValidateLocation(DataToValidate) {
	if (DataToValidate && DataToValidate['location'] && (DataToValidate['location'] == "hostel" || DataToValidate['location'] == "dayscholar")) {
		return true;
	} else {
		return false;
	}
}

function ValidatePassword(DataToValidate) {
	if (DataToValidate && DataToValidate['password']) {
		return true;
	} else {
		return false;
	}
}

function ValidateDOB(DataToValidate) {
	if (DataToValidate && DataToValidate['_dob'] && moment(DataToValidate['_dob'], "DDMMYYYY", true).isValid()) {
		return true;
	} else {
		return false;
	}
}

function ValidateApiKey(DataToValidate) {
	if (DataToValidate && DataToValidate['_apikey'] === "TESTING") {
		return true;
	} else {
		return false;
	}
}