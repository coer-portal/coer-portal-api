const ValidateDeviceID = require('../../server/middlewares/ValidateDeviceID/ValidateDeviceID');

// ValidateDeviceID
describe('Validate Device ID Module', () => {
	test('Should return an ID if nothing is provided', () => {
		expect(ValidateDeviceID()).toEqual(expect.any(String));
	});

	test('Should return the same ID if an ID is provided', () => {
		expect(ValidateDeviceID('COOLDEVICEID')).toBe('COOLDEVICEID');
	});

	test('Should return new Device ID if undefined or null is provided', () => {
		expect(ValidateDeviceID(undefined)).toEqual(expect.any(String));
		expect(ValidateDeviceID(null)).toEqual(expect.any(String));
		expect(ValidateDeviceID("null")).not.toBe("null");
		expect(ValidateDeviceID("null")).toEqual(expect.any(String));
		expect(ValidateDeviceID("undefined")).not.toBe('undefined');
		expect(ValidateDeviceID("undefined")).toEqual(expect.any(String));
	});

});