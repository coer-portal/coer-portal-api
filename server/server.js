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
    // Use bodyParser Middleware
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
        user = req.params['user'];
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
                        _id: { $eq: id }
                    }).toArray(function (err, docs) {
                        if (docs.length == 0) {
                            res.send("No record found");
                        } else {
                            res.send(JSON.stringify(docs[0]));
                        }
                    });
                    db.close(function () {
                        console.log("Closed connection after retrieving data for ID " + id);
                    });
                }
            });
        }
    } else {
        // The user is not authorized to access database. So, return a 401 code which means Unauthorized access and a message saying the same
        sendResCode(401, res, "<h1>Error 401: Unauthorized</h1>");
    }
});

app.post('/:context', function (req, res) {
    var context = req.params['context'],
        authkey = req.headers.authkey;
    var ID = req.query.ID,
        name = req.query.name,
        phoneno = req.query.phoneno,
        fatherno = req.query.fatherno,
        DOB = req.query.DOB,
        currentStatus = req.query.currentStatus;
    if (req.query.currentStatus == 'dayscholar') {
        var hostel = "no hostel";
    }
    // Check if supplied authentication key matches the one set in .env
    if (authkey == process.env.SUBMITKEY) {
        // Check the type of operation to perform. 
        // This can be register or it can be update
        if (context == "register") {

            mongo.connect(MONGODB_URI, function (err, db) {
                if (err) {
                    throw err;
                } else {
                    var information = db.collection('information');
                    // First check if the user already exists in database
                    // If user exists then return it's details
                    information.find({ _id: { $eq: ID } }).toArray(function (err, docs) {
                        if (err) throw err;
                        if (docs.length === 0) {

                            console.log("User does not exists. Registering in database");
                            var tempData = seeddata.info(ID, name, phoneno, fatherno, DOB, currentStatus, hostel);
                            information.insert(tempData.info, function (err, result) {
                                if (err) throw err;
                                res.send(result);
                                console.log(JSON.stringify(seeddata.info(ID, name, phoneno, fatherno, DOB, currentStatus, hostel)));
                            });
                        } else {
                            console.log("User already exists. Returning user(" + ID + ") details")
                            console.log(JSON.stringify(docs[0]))
                            res.send(docs);

                        }
                        db.close();
                    })
                }
            });
        }
        else {
            // Unauthorized to access database. Send a 401 and a message. 
            sendResCode(401, res, "<h1>Error 401: Not Authorized</h1>");
        }
    }
});