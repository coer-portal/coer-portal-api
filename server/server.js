var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var PORT = process.env.PORT || 5000;

var mongodburl = "mongodb://localhost:27017/userAttendance";

app.listen(PORT);

console.log("Server started at " + port);

mongo.connect(mongodburl, function (err, db) {

    db.createCollection("user", { autoIndexID: true });

    db.close();
});