/* Seed Database
 * This is Template of the data that'll be stored in database
 */
var data = require('../routes/student/student-attendance').studentAttendance;
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
    "info": function (_id, name, phoneno, fatherno, DOB, currentStatus, attendance, attenLastUpdatedOn, hostel) {
        return {
            "_id": _id,
            "personal": {
                "name": name,
                "phoneno": phoneno,
                "fatherno": fatherno,
                "DOB": DOB,
                "currentStatus": currentStatus
            },
            "academics": {
                "attendance": {
                    "attendance": attendance,
                    "attenLastUpdatedOn": attenLastUpdatedOn
                },
                "yearofstudy": 2,
                "branch": "IT",
                "section": "C"

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