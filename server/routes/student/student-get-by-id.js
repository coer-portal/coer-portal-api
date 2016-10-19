
var sendResCode = require('../../sendResCode');
var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;


// Ports configuration for heroku and a local setup 
var MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOURL;

function studentGetByID(req, res) {

    var authkey = req.headers.authkey,
        id = req.params['id'];

    if (authkey === process.env.ACCESSKEY) {

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

                        res.send("\nNo record found\n");
                        console.log("\nNo Record Found\n")
                    } else {
                        console.log("\nRecord Found!\n");
                        res.send(JSON.stringify(docs[0]));

                    }

                });
                db.close(function () {

                    console.log("Closed connection after retrieving data for ID " + id + "\n");

                });
            }
        });
    } else {

        // The user is not authorized to access database. So, return a 401 code which means Unauthorized access and a message saying the same
        sendResCode(401, res, "<h1>Error 401: Unauthorized</h1>");

    }
}

module.exports = studentGetByID;