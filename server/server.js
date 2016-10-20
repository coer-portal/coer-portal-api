// Load environment variables from .env
require('dotenv').config();

// Require Required Stuff
var express = require('express');
var app = express();
var route = require('./routes/index');
var sendResCode = require('./sendResCode');

// Ports configuration for heroku and a local setup 
var PORT = process.env.PORT || process.env.APP_PORT;
var MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOURL;

console.log("PORT: " + PORT + "\nMONGODB_URL: " + MONGODB_URI + "\nACCESSKEY: " + process.env.ACCESSKEY + "\nSUBMITKEY: " + process.env.SUBMITKEY + "\n")
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
    sendResCode(404, res, "Error 404: Resource not found");
});


// get all the data about a student using ID as input.
// user depends on who is accessing database and can have 2 possible values. student or warden
// AUTHKEY is stored in .env file and removed from Git. Check sample.env for an example
app.get('/student/:id', function (req, res) { route.studentGetByID(req, res) });

// route that handles Registration.
app.post('/student/register', function (req, res) { route.studentRegister(req, res) });



app.get('/student/attendance/:id', function (req, res) { route.studentAttendance(req, res) });