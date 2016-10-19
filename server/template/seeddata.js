/* Seed Database
 * This is Template of the data that'll be stored in database
 */

// Require is like import. 
var unirest = require('unirest');

// Function to get Attendance from College server
// They just give the whole HTML page. So I used split and substr to get the information I want
// Takes attendance and Last Updated Date.
function getAttendance(ID) {
    var Attendance = null,
        attendanceLastUpdatedOn = null;
    console.log(unirest
        .post('http://coer.ac.in/atten.php')
        .field('coerid', ID)
        .end(function (res) {

            if (res.error) {
                return res.error;
            } else {
                // TODO: Use Cheerio here, Instead of using a hacky solution
                return res.raw_body.split("<h3>")[1].split("</h3>")[0].split("%")[0].substr(String.length - 6);

                // This is wrong.
                // TODO: Find some other way to return Attendance and attendanceLastUpdatedOn
            }
        })
    );
}
getAttendance(15041121);


// Function that returns correct value of hostel by checking the value of hostel supplied to it. 
// Returns null if student is a Day Scholar and returns correct properties if student is a hosteler
function getHostel(hostel) {

    if (hostel == "no hostel") {

        return null;

    } else {

        return {
            "roomno": 291,
            "hostelCode": "KKB",
            "outpassesAlotted": [
                {
                    "outpassID": "171020160001",
                    "outpassDate": "17102016",
                    "outpassFromTime": "0900",
                    "outpassToTime": "0500",
                    "addrOfStay": "Roorkee",
                    "outpassPurpose": "Shopping",
                    "contactNum": 4567894641,
                    "relation": null,
                    "approved": 1
                }
            ],
            "leavesAlotted": [
                {
                    "leaveID": "171020160001",
                    "leaveFromDate": "17102016",
                    "leaveToDate": "30102059",
                    "leaveFromTime": "1234",
                    "leaveToTime": "1346",
                    "addrOfStay": "HOME",
                    "leavePurpose": "HOME",
                    "contactNum": 4567946579,
                    "relation": null,
                    "approved": 0
                }
            ]
        }
    }
}

module.exports = {
    // info is a method that returns a JSON template with all the value filled up.
    "info": function (ID, name, phoneno, fatherno, DOB, currentStatus, hostel) {
        return {
            "_id": ID,
            "personal": {
                "name": name,
                "phoneno": phoneno,
                "fatherno": fatherno,
                "DOB": DOB,
                "currentStatus": currentStatus
            },
            "academics": {
                "attendance": getAttendance(ID),
                "attendanceLastUpdatedOn": '18102016',
                "yearofstudy": 2,
                "branch": "IT",

            },
            "hostel": getHostel(hostel)
        }
    },
    // Secret is a function that will return a JSON to be stored in secret collection in DB.
    // Works exactly like info.
    // TODO: Implementation is not complete yet.
    "secret": function (pass, id) {
        return {
            "id": id,
            "password": pass
        }
    }
}