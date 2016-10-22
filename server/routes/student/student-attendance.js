var unirest = require('unirest');
var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;

var MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOURL;

var studentAttendance = {
    "studentAttendance": function (req, res) {
        var _id = req.params['id'];
        unirest
            .post('http://coer.ac.in/atten.php')
            .field('coerid', _id)
            .end(function getData(response) {
                if (response.error) {
                    console.log(response.error);
                    res.send(response.error)
                } else {
                    if (response.raw_body.indexOf('Invalid COER ID') === -1) {

                        studentAttendance.data._id = _id;
                        studentAttendance.data.name = response.raw_body.split("<h3>")[1].split("</h3>")[0].split("Mr/Ms ")[1].split(" have")[0];
                        studentAttendance.data.attendance = parseFloat(response.raw_body.split("have ")[1].split("%")[0]);
                        studentAttendance.data.attenLastUpdated = response.raw_body.split("<p>")[1].split("</p>")[0].split(" Update ")[1]

                        console.log("\n\t\t Found ID in Database\n" + JSON.stringify(studentAttendance.data) + "\n Updating Record in Database");
                        mongo.connect(MONGODB_URI, function (err, db) {
                            if (err) throw err;
                            else {
                                var information = db.collection('information');
                                console.log("\nRequest Path:" + req.path + "\n");
                                information.update(
                                    { _id: _id },
                                    {
                                        $set: {
                                            "_id": studentAttendance.data._id,
                                            "personal.name": studentAttendance.data.name,
                                            "academics.attendance.attendance": studentAttendance.data.attendance,
                                            "academics.attendance.attenLastUpdatedOn": studentAttendance.data.attenLastUpdated
                                        }
                                    })
                            }

                        });
                        res.send(studentAttendance.data);
                    } else {
                        studentAttendance.data._id = _id;
                        studentAttendance.data.name = null;
                        studentAttendance.data.attendance = "Invalid ID",
                            studentAttendance.data.attenLastUpdated = "Invalid ID"
                        console.error("\nError: Invalid COER ID. No match in Database.");

                        res.send(studentAttendance.data);
                    }
                }
            }
            , attendanceCallback)
    },
    "data": {
        "_id": null,
        "name": null,
        "attendance": null,
        "attenLastUpdated": null

    }
}
function attendanceCallback() {
    return studentAttendance.data;
}

module.exports = studentAttendance;