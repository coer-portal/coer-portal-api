// Load environment variables from .env
require('dotenv').config();

// Require Required Stuff
var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;
var Db = mongodb.Db;
var Server = mongodb.Server;
var express = require('express');
var app = express();
var seeddata = require('./seed');

// Ports configuration for heroku and a local setup 
var PORT = process.env.PORT || process.env.APP_PORT;
var MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOURL;

// Starting web server
try {
    app.listen(PORT);
} catch (e) {
    console.log(e);
} finally {
    console.log("App is running at http://localhost:" + PORT);
}

mongo.connect(MONGODB_URI, function (err, db) {
    if (err) throw err;
    console.log("Connected to MONGODB at " + MONGODB_URI);
    var personal = db.collection('personal');
    var secret = db.collection('secret');

    personal.insert(seeddata.personal, function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result.result.ok));
    });

    db.close();

});


app.get('/', function (req, res) {
    res.send(process.env);
});
