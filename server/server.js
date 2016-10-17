// Load environment variables from .env
require('dotenv').config();

// Require Required Stuff
var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;
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

app.get('/:authkey/:id', function (req, res) {
    var authkey = req.params['authkey'],
        id = req.params['id'];
    if (authkey === "qwerfdsazxcv456789") {
        mongo.connect(MONGODB_URI, function (err, db) {
            if (err) throw err;
            console.log("Connected to DB. Retrieving data for " + id);
            var personal = db.collection('personal');
            personal.find({
                id: { $eq: +id }
            }).toArray(function (err, docs) {
                if (docs.length == 0) {
                    res.send("NO record found");
                } else {
                    res.send(docs[0]);
                }
            });
            db.close();
        });
    }
});