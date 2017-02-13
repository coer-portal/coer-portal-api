const redis = require('redis'),
	redisClient = redis.createClient(),
	GenerateAccessToken = require('../../server/middlewares/GenerateAccessToken/GenerateAccessToken');

describe("Generate Access Token ", () => {
	const _id = 15051018, _deviceid = "4657897asd4as65d4ag7as9d87asd54asd6";
	test("Should Create a accesstoken and save it in Redis with _deviceid as key", () => {
		GenerateAccessToken({_id: _id, _deviceid: _deviceid}, redisClient)
			.then(result => {
				let {accesstoken, error, data} = result;
				expect(accesstoken).toEqual(expect.any(String));
				expect(accesstoken.length).toEqual(40);
				expect(error).toEqual(0);
				expect(data._id).toEqual(_id);
				expect(data._deviceid).toEqual(_deviceid);
			});
	});
	test("Should have a Expire time of 12 hours", () => {
		redisClient.ttl(_deviceid, (err, time) => {
			if (err) throw err;
			expect(time).toBeGreaterThan(43199);
		});
	});
});