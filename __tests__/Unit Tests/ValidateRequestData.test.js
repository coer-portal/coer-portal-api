const ValidateRequestData = require('../../server/middlewares/ValidateRequestData/ValidateRequestData');

// ValidateRequestData
describe("Validate Request Data Module", () => {
	test("Should return true if all values are Valid", () => {
		ValidateRequestData({
			_id: 15051019,
			phoneno: 7896451234,
			fatherno: 9874653145,
			password: "SUPERSECRETPASSWORD",
			location: "hostel"
		}).then(result => {
			expect(result).toEqual({error: 0, invalidKeys: []});
		});
	});

	test("Should return an array containing all the Invalid Data if Some Data is Invalid", () => {
		ValidateRequestData({
			_id: 15051019,
			phoneno: 7896451234,
			fatherno: 9874653145,
			_dob: 16102016,
			_apikey: "TESTING",
			password: "SUPERSECRETPASSWORD",
			location: "hostelle"
		}).catch(result => {
			expect(result).toEqual({error: 'E101', invalidKeys: ['location']});
		});
		ValidateRequestData({
			_id: 15051019,
			phoneno: 7896451234,
			fatherno: 9874653145,
			_dob: 16102016,
			_apikey: "",
			password: "SUPERSECRETPASSWORD",
			location: "hostel"
		}).catch(result => {
			expect(result).toEqual({error: 'E101', invalidKeys: ['_apikey']});
		});
		ValidateRequestData({
			_id: 1505109,
			phoneno: 789451234,
			fatherno: 987653145,
			_dob: 29022016,
			_apikey: "TESTING",
			password: "SUPERSECRETPASSWORD",
			location: "hostel"
		}).catch(result => {
			expect(result).toEqual({error: 'E101', invalidKeys: ["_id", "phoneno", "fatherno"]});
		});
	});

	test("Should return false if No data is provided", () => {
		ValidateRequestData().catch(result => {
			expect(result).toEqual({"error": "E101", "invalidKeys": []});
		});
	});
});
