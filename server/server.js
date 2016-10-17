// Load environment variables from .env
require('dotenv').config();

// Require Required Stuff
var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;
var express = require('express');
var app = express();
var seeddata = require('./seeddata');
var $ = require("jquery");

// Ports configuration for heroku and a local setup 
var PORT = process.env.PORT || process.env.APP_PORT;
var MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOURL;

// Starting web server
try {
    app.listen(PORT);
    app.disable('x-powered-by');
} catch (e) {
    console.log(e);
} finally {
    console.log("App is running at http://localhost:" + PORT);
}
// Set to send a 404 on any kind of request to '/'
app.all('/', function (req, res) {
    sendResCode(404, res, "<h1>Error: Resource not found</h1>");
});

// function to send Res code in bad cases
function sendResCode(code, response, msg) {
    response.statusCode = code;
    response.send(msg);
}

// get all the data about a student using ID as input.
// user depends on who is accessing database and can have 2 possible values. student or warden
// AUTHKEY is stored in .env file and removed from Git. Check sample.env for an example
app.get('/:user/:id', function (req, res) {
    var authkey = req.headers.authkey,
        id = req.params['id'],
        user = req.params['usertype'];
    if (authkey === process.env.ACCESSKEY) {
        if (user == "student") {
            mongo.connect(MONGODB_URI, function (err, db) {
                if (err) {
                    throw err;
                } else {
                    console.log("Connected to DB. retrieving data for ID " + id);
                    var information = db.collection('information');

                    // Find people with given ID in information collection
                    information.find({
                        // TODO: Fix this bug here. It should access personal.id and not id. 
                        id: { $eq: +id }
                    }).toArray(function (err, docs) {
                        if (docs.length == 0) {
                            res.send("No record found");
                        } else {
                            res.send(docs[0]);
                        }
                    });
                    db.close(function () {
                        console.log("Closed connection after retrieving data for ID " + id);
                    });
                }
            });
        }
    } else {
        sendResCode(401, res, "<h1>Error 401: Unauthorized</h1>");
    }
});

app.post('/:context/:submitteddata', function (req, res) {
    var context = req.params['context'],
        authkey = req.headers.authkey,
        subdata = req.params['submitteddata'];

    if (authkey == process.env.SUBMITKEY) {
        if (context == "register") {
            // Assuming that subdata is stringified JSON
            var data = JSON.parse(subdata),
                dataID = data.id;
            // Connect to database and save all the data in it

            mongo.connect(MONGODB_URI, function (err, db) {
                if (err) {
                    throw err;
                } else {
                    console.log("Connected to DB. \n. Saving Data to DB");
                    var information = db.collection('information');

                    // First check if the user already exists in database
                    // If user exists then return it's details
                    information.find({
                        id: { $eq: +dataID }
                    }).toArray(function (err, docs) {
                        if (docs.length == 0) {
                            console.log("User does not exists. Registering in database");

                        } else {
                            console.log("User already exists. Returning user(" + dataID + ") details")
                            res.send(docs[0]);
                        }
                    });
                }
            });

        }
    } else {
        sendResCode(401, res, "<h1>Error 401: Not Authorized</h1>");
    }
});