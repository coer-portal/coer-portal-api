const express = require('express'),
	Mongo = require('mongodb'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	redis = require('redis'),
	url = require('url'),
	cors = require('cors'),
	path = require('path'),
	RouteIndex = require('./routes/index'),
	app = express(),
	MongoClient = Mongo.MongoClient;

// For letsencrypt
app.use('/.well-known', express.static(path.resolve(process.cwd(), '.well-known')));

// Body Parser to easily access request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Use GZip Compression to reduce response size
app.use(compression());

// Enable CORS 
app.use(cors());

// Use Router Available in routers/index
app.use(RouteIndex);

// Disable X-Powered-By from response
app.disable('x-powered-by');

// PORT and MONGODB Addresses for Dev Setup
let PORT = 5000,
	MONGODB = "mongodb://localhost:27017/coer";

if (process.env.NODE_ENV === "production") {
	// Settings to be used in Production env
	PORT = process.env.PORT || PORT;
	MONGODB = process.env.MONGODB_URI;
	// Connect to Redis and make it available on req.app.locals
	// let rtgURL = url.parse(process.env.REDISTOGO_URL);
	// let client = redis.createClient(rtgURL.port, rtgURL.hostname);
	// client.auth(rtgURL.auth.split(":")[1]);

	app.locals.redisClient = redis.createClient();
} else {
	// Connect to redis and make it available on req.app.locals in dev env
	app.locals.redisClient = redis.createClient();
}
// Connect to MongoDB
MongoClient.connect(MONGODB, (err, db) => {
	if (err) {
		throw err;
	} else {
		app.locals.db = db;
	}
});

// Start the Server and listen on Specified PORT
app.listen(PORT, (err) => {
	if (err) {
		throw err;
	}
	console.log(`Server Started on port ${PORT}`);
});