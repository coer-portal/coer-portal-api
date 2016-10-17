/* Seed Database
 * This is Sample of the data that'll be stored in database
 */

/*
 *{
 *  "personal": {
 *       "id": "coerid",
 *       "name": "CRASH",
 *       "phoneno": "10 digit number",
 *       "permanentaddr": "Long String",
 *       "academics": {
 *           "attendance": "ATTENDANCE(float as string)",
 *           "yearofstudy": "1-4",
 *           "semofstudy": "1-8",
 *           "branch": "CS || IT || CE || EN || ET || ",
 *           "section": "A-H"
 *       },
 *       "hostel": {
 *           "roomno": "INTEGER",
 *           "hostelCode": "BCJ || KKB || GSB || ARB || ASB || AHB || TAB || SAB || AKB",
 *           "outpassesAlotted": [
 *               {
 *                   "outpassDate": "date in ddmmyyyy format",
 *                   "outpassFrom": "Time in hhmm format",
 *                   "outpassTo": "Time in hhmm format",
 *                   "addrOfStay": "Where'll be going to",
 *                   "outpassPurpose": "Purpose of going",
 *                   "contactNum": "Contact number",
 *                   "relationship": "What was this for?? Relationship to someone who might be living in that city?"
 *               }
 *           ],
 *           "leavesAlotted": [
 *               {
 *                   "leaveFromDate": "date in ddmmyyyy format",
 *                   "leaveToDate": "date in ddmmyyyy format",
 *                   "leaveFromTime": "Time in hhmm format",
 *                   "leaveToTime": "Time in hhmm format",
 *                   "addrOfStay": "Where'll be going to",
 *                   "leavePurpose": "Purpose of going",
 *                   "contactNum": "Contact number",
 *                   "relationship": "What was this for?? Relationship to someone who might be living in that city?"
 *              }
 *           ]
 *       }
 *   },
 *   "secret": {
 *       "id": "coerid",
 *       "password": "Shh.ASecret521431"
 *   }
 * }
 */

// Actual Sample

module.exports = {
    "personal": {
        "id": 15051018,
        "name": "CRASH",
        "phoneno": 4595235679,
        "fatherno": 456789465,
        "academics": {
            "attendance": 75,
            "yearofstudy": 2,
            "branch": "IT",
        },
        "hostel": {
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
    },
    "secret": {
        "id": 15051018,
        "password": "Shh.ASecret521431"
    }
}