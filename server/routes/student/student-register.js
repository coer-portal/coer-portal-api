

var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;
var sendResCode = require('../../sendResCode');
var template = require('../../template/template');
var unirest = require('unirest');


// Ports configuration for heroku and a local setup 
var MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOURL;
var PORT = process.env.PORT || process.env.APP_PORT;


function studentRegister(req, res) {

    // Authentication Key provided in header. "authkey"
    var authkey = req.headers.authkey || null;

    // Rest of the data that will be required to complete registration is transferred as query. 
    // Kind of weird I guess but I think it's fine to transfer data like this. 
    var userData = {
        "_id": req.query.ID,
        "phoneno": req.query.phoneno,
        "fatherno": req.query.fatherno,
        "DOB": req.query.DOB,
        "currentStatus": req.query.currentStatus
    }

    // This method sets hostel field in database to null if the student is Day Scholar and doesn't lives in Hostel
    // hostel variable is passsed to template.info method and the functions in template.js check the value and set hostel property accordingly
    var hostel = "hostel"
    if (req.query.currentStatus == 'dayscholar') {
        hostel = "no hostel";
    }

    // Validate the data submitted
    // function validateUserData(userData, validationCallback) {
    //     var trueArray = [];
    //     if (userData._id.length == 8) {
    //         trueArray.push(true);
    //     } else {
    //         trueArray.push(false);
    //     }
    //     if (userData.phoneno.length == 10 && userData.fatherno.length == 10) {
    //         trueArray.push(true);
    //     } else {
    //         trueArray.push(false);
    //     }
    //     if (userData.DOB.length == 8) {
    //         var date = userData.DOB.substr(0, 2);
    //         var month = userData.DOB.substr(2, 4);

    //         if (date > 31) {
    //             trueArray.push(false);
    //         } else if (month > 12) {
    //             trueArray.push(false)
    //         }
    //     } else {
    //         trueArray.push(false);
    //     }

    //     validationCallback(trueArray);
    // }


    // if (validateUserData(userData, validationCallback)) {
    // Check if supplied authentication key matches the one set in .env
    if (authkey == process.env.SUBMITKEY) {
        mongo.connect(MONGODB_URI, function (err, db) {
            if (err) {
                throw err;
            } else {
                // Select collection - information
                var information = db.collection('information');

                // First check if the user already exists in database
                // If user exists then return it's details
                information.find({ _id: { $eq: userData._id } }).toArray(function (err, docs) {

                    // watch  for errors
                    if (err) throw err;

                    // If the error is empty means we have no one with that _id. 
                    // New Person!! Register him in database
                    if (docs.length === 0) {

                        // Print to console "User doesn't exists in DB
                        console.log("\nUser does not exists. Registering in database\n");

                        /* Insert the JSON in database
                         * template.info method is used to generate a JSON using provided data and template and give that as 
                         * an input to .insert method
                         */
                        information.insert(template.info(userData._id, userData.phoneno, userData.fatherno, userData.DOB, userData.currentStatus, hostel), function (err, result) {

                            // Watch for errors
                            if (err) {
                                throw err;
                            } else {
                                // Update name, Attedance and attenLastUpdatedOn in database because they are retrieved from College Database
                                var AttendanceURL = 'http://' + req.hostname + ':' + PORT + '/student/attendance/' + userData._id;
                                console.log(AttendanceURL);
                                unirest.get(AttendanceURL).end(function (response) {
                                    if (response.error) throw response.error;
                                    // Nothing to do here. 
                                    // I created this function so I can call /student/attendance/:id
                                    //  When I will get that url it'll get the attendance and name and update it in database.
                                    // I don't have anything to do with response in this case. 
                                    // If I had taken an alternate approach than this would've been pretty good way to go
                                }, updateCallback(res, result, information));

                                // Print the JSON to console
                                console.log(JSON.stringify(template.info(userData._id, userData.phoneno, userData.fatherno, userData.DOB, userData.currentStatus, hostel)) + "\n");
                            }
                        });
                    } else {

                        // Print user already exists
                        console.log("User already exists. Returning user(" + userData._id + ") details\n");

                        // Print the user details to console
                        console.log(JSON.stringify(docs[0]));

                        // Send the same as the result of this call
                        res.send(docs[0]);

                    }
                    db.close(function () {
                        console.log("Closing database after completing POST operation to " + req.path);
                    });
                })
            }
        });
    } else {

        // Unauthorized to access database. Send a 401 and a message. 
        sendResCode(401, res, "<h1>Error 401: Not Authorized</h1>");

    }
}
// } else {
//     console.log(validateUserData(userData));
//     res.send({
//         "error": "Some field is missing. Please check."
//     });
// }
// }

// function validationCallback(trueArray) {
//     return trueArray.indexOf(false) === -1;
// }

function updateCallback(res, id, information) {
    // Send the result to client
    information.find({ _id: { $eq: id } }).toArray(function (err, docs) {
        res.send(docs[0]);
    });
    
}
module.exports = studentRegister;