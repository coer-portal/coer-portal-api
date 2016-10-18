// Load environment variables from .env
require('dotenv').config();

// Require Required Stuff
var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;
var express = require('express');
var app = express();
var seeddata = require('./seeddata');
var fs = require('fs');


// Ports configuration for heroku and a local setup 
var PORT = process.env.PORT || process.env.APP_PORT;
var MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOURL;

// Starting web server
try {

    app.listen(PORT);

    // Disabled X-Powered-By header as a security measure
    app.disable('x-powered-by');

} catch (e) {

    console.log(e);

} finally {

    console.log("App is running at http://localhost:" + PORT + "\n");

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

        user = req.params['user'];

    if (authkey === process.env.ACCESSKEY) {

        if (user == "student") {

            mongo.connect(MONGODB_URI, function (err, db) {

                if (err) {

                    throw err;

                } else {

                    console.log("Connected to DB. retrieving data for ID " + id + "\n");

                    var information = db.collection('information');

                    // Find people with given ID in information collection
                    information.find({

                        _id: { $eq: id }

                    }).toArray(function (err, docs) {

                        if (docs.length == 0) {

                            res.send("No record found");

                        } else {

                            res.send(JSON.stringify(docs[0]));

                        }

                    });

                    db.close(function () {

                        console.log("Closed connection after retrieving data for ID " + id + "\n");

                    });

                }

            });

        }

    } else {

        // The user is not authorized to access database. So, return a 401 code which means Unauthorized access and a message saying the same
        sendResCode(401, res, "<h1>Error 401: Unauthorized</h1>");

    }

});

app.post('/register', function (req, res) {

    // Authentication Key provided in header. "authkey"
    var authkey = req.headers.authkey;

    // Rest of the data that will be required to complete registration is transferred as query. 
    // Kind of weird I guess but I think it's fine to transfer data like this. 
    // Everything will be transferred over https
    var ID = req.query.ID,
        name = req.query.name,
        phoneno = req.query.phoneno,
        fatherno = req.query.fatherno,
        DOB = req.query.DOB,
        currentStatus = req.query.currentStatus;

    // This method sets hostel field in database to null if the student is Day Scholar and doesn't lives in Hostel
    // hostel variable is passsed to seeddata.info method and the functions in seeddata.js check the value and set hostel property accordingly

    var hostel = "hostel"
    if (req.query.currentStatus == 'dayscholar') {

        hostel = "no hostel";

    }

    // Check if supplied authentication key matches the one set in .env
    if (authkey == process.env.SUBMITKEY) {

        mongo.connect(MONGODB_URI, function (err, db) {

            if (err) {

                throw err;

            } else {

                var information = db.collection('information');

                // First check if the user already exists in database
                // If user exists then return it's details
                information.find({ _id: { $eq: ID } }).toArray(function (err, docs) {

                    // watch out for errors
                    if (err) throw err;

                    // If the error is empty means we have no one with that ID. 
                    // New Person!! Register him in out database
                    if (docs.length === 0) {

                        // Print to console "User doesn't exists in DB
                        console.log("User does not exists. Registering in database" + "\n");

                        // Insert the JSON in database
                        // seeddata.info method is used to generate a JSON using provided data and template and give that as 
                        // an input to .insert method
                        information.insert(seeddata.info(ID, name, phoneno, fatherno, DOB, currentStatus, hostel), function (err, result) {

                            // Watch out for errors
                            if (err) throw err;

                            // Send the result to client
                            res.send(result);

                            // Print the JSON to console
                            console.log(JSON.stringify(seeddata.info(ID, name, phoneno, fatherno, DOB, currentStatus, hostel)) + "\n");

                        });

                    } else {

                        // Print user already exists
                        console.log("User already exists. Returning user(" + ID + ") details\n");

                        // Print the user details to console
                        console.log(JSON.stringify(docs[0]));

                        // Send the same as the result of this call
                        res.send(docs);

                    }

                    db.close();

                })

            }

        });

    } else {

        // Unauthorized to access database. Send a 401 and a message. 
        sendResCode(401, res, "<h1>Error 401: Not Authorized</h1>");

    }

});
