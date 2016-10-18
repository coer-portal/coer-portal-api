/* Seed Database
 * This is Sample of the data that'll be stored in database
 */

// Actual Sample
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
    "info": function (ID, name, phoneno, fatherno, DOB, currentStatus, hostel) {
        return {
            "info": {
                "_id": ID,
                "personal": {
                    "name": name,
                    "phoneno": phoneno,
                    "fatherno": fatherno,
                    "DOB": DOB,
                    "currentStatus": currentStatus
                },
                "academics": {
                    "attendance": 75,
                    "yearofstudy": 2,
                    "branch": "IT",
                },
                "hostel": getHostel(hostel)
            },
            "secret": function (pass, id) {
                return {
                    "id": +id,
                    "password": +pass
                }
            }
        }
    }
}