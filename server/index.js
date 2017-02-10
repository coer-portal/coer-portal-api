const express = require('express'),
	app = express(),
	RouteIndex = require('./routes/index'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	Mongo = require('mongodb'),
	MongoClient = Mongo.MongoClient;

app.use(compression());

app.use(bodyParser.urlencoded({extended: true}));

app.use(RouteIndex);

app.disable('x-powered-by');

let PORT = 5000,
	MONGODB_URI = "mongodb://localhost:27017/coer";
if (process.env.PORT === "production") {
	PORT = process.env.PORT;
	MONGODB_URI = process.env.MONGODB_URI;
}
MongoClient.connect(MONGODB_URI, (err, db) => {
	if (err) {
		throw err;
	} else {
		app.locals.db = db;
	}
});

app.listen(PORT, (err) => {
	if (err) {
		throw err;
	}
	console.log(`Server Started on port ${PORT}`);
});