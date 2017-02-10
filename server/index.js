const express = require('express'),
	app = express(),
	RouteIndex = require('./routes/index'),
	compression = require('compression'),
	bodyParser = require('body-parser');

app.use(compression());

app.use(bodyParser.urlencoded({extended: true}));

app.use(RouteIndex);

app.disable('x-powered-by');

let PORT = 5000,
	MONGODB_URI = "mongodb://localhost:27017/coer";
if (process.env.PORT === "production") {
	PORT = process.env.PORT;
	MONGODB_URI = "mongodb://localhost:27017/heroku_c5m6f6x8";
}

app.listen(PORT, (err) => {
	if (err) {
		throw err;
	}
	console.log(`Server Started on port ${PORT}`);
});