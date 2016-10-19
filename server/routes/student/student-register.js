

var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;
var sendResCode = require('../../sendResCode');
var seeddata = require('../../template/seeddata');

// Ports configuration for heroku and a local setup 
var MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOURL;

function studentRegister(req, res) {

    // Authentication Key provided in header. "authkey"
    var authkey = req.headers.authkey || null;

    // Rest of the data that will be required to complete registration is transferred as query. 
    // Kind of weird I guess but I think it's fine to transfer data like this. 
    var ID = req.query.ID,
        // Everything will be transferred over https
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
                // Select collection named information
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
                        console.log("\nUser does not exists. Registering in database\n");

                        // Insert the JSON in database
                        // seeddata.info method is used to generate a JSON using provided data and template and give that as 
                        // an input to .insert method
                        information.insert(seeddata.info(ID, name, phoneno, fatherno, DOB, currentStatus, hostel), function (err, result) {

                            // Watch out for errors
                            if (err) {
                                throw err;
                            } else {

                                // Send the result to client
                                res.send(result);

                                // Print the JSON to console
                                console.log(JSON.stringify(seeddata.info(ID, name, phoneno, fatherno, DOB, currentStatus, hostel)) + "\n");
                            }
                        });
                    } else {

                        // Print user already exists
                        console.log("User already exists. Returning user(" + ID + ") details\n");

                        // Print the user details to console
                        console.log(JSON.stringify(docs[0]));

                        // Send the same as the result of this call
                        res.send(docs[0]);

                    }
                    db.close(function () {
                        console.log("Closing database after completing POST operation to /register");
                    });

                })

            }

        });

    } else {

        // Unauthorized to access database. Send a 401 and a message. 
        sendResCode(401, res, "<h1>Error 401: Not Authorized</h1>");

    }
}
module.exports = studentRegister;