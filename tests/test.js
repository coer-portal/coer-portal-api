// unirest is required to do REST stuff in Node
var unirest = require('unirest');

function getRecord(ID) {
    unirest
        .get(getRecordURL(ID))
        .headers({ 'authkey': 'testingKEY' })
        .end(function (res) {
            console.log(res.body);
        });
}
if (process.argv.indexOf('-P') == -1) {
    getRecord(process.argv[2]);

}
if (process.argv.indexOf('-G') == -1) {
    postRecord(process.argv[2], 9457894561, 4657981234, 24012016, "dayscholar");
}
function postRecordURL() {
    if (process.argv.indexOf('-LOCAL') == -1) {
        return "http://coer-backend.herokuapp.com/student/register"
    } else {
        return "http://localhost:5000/student/register";
    }
}
function getRecordURL(ID) {
    if (process.argv.indexOf('-LOCAL') == -1) {
        return "http://coer-backend.herokuapp.com/student/full/" + ID;
    } else {
        return "http://localhost:5000/student/full/" + ID;
    }

}
function postRecord(ID, phoneno, fatherno, DOB, currentStatus) {
    unirest
        .post(postRecordURL())
        .headers({ 'authkey': 'SUPERPRIVATE' })
        .query({
            ID: ID,
            phoneno: phoneno,
            fatherno: fatherno,
            DOB: DOB,
            currentStatus: currentStatus
        })
        .end(function (res) {
            if (res.error) {
                throw res.error;
            }
            console.log(res.raw_body)
        })
}
var testData = [
    {
        ID: 15051019,
        name: "Test Subject 1",
        phoneno: 4578945632,
        fatherno: 4679865321,
        DOB: 01112014,
        currentStatus: "hostel"
    }, {
        ID: 15051019,
        name: "Test Subject 2",
        phoneno: 4578945632,
        fatherno: 4679865321,
        DOB: 01112014,
        currentStatus: "hostel"
    }, {
        ID: 15051019,
        name: "Test Subject 3",
        phoneno: 4578945632,
        fatherno: 4679865321,
        DOB: 01112014,
        currentStatus: "hostel"
    }, {
        ID: 15051019,
        name: "Test Subject 4",
        phoneno: 4578945632,
        fatherno: 4679865321,
        DOB: 01112014,
        currentStatus: "hostel"
    }, {
        ID: 15051019,
        name: "Test Subject 5",
        phoneno: 4578945632,
        fatherno: 4679865321,
        DOB: 01112014,
        currentStatus: "hostel"
    }, {
        ID: 15051019,
        name: "Test Subject 6",
        phoneno: 4578945632,
        fatherno: 4679865321,
        DOB: 01112014,
        currentStatus: "hostel"
    }, {
        ID: 15051019,
        name: "Test Subject 7",
        phoneno: 4578945632,
        fatherno: 4679865321,
        DOB: 01112014,
        currentStatus: "hostel"
    }, {
        ID: 15051019,
        name: "Test Subject 8",
        phoneno: 4578945632,
        fatherno: 4679865321,
        DOB: 01112014,
        currentStatus: "hostel"
    }, {
        ID: 15051019,
        name: "Test Subject 9",
        phoneno: 4578945632,
        fatherno: 4679865321,
        DOB: 01112014,
        currentStatus: "hostel"
    }, {
        ID: 15051019,
        name: "Test Subject 10",
        phoneno: 4578945632,
        fatherno: 4679865321,
        DOB: 01112014,
        currentStatus: "hostel"
    }
];


console.log("\n---------------Get Test---------------\n");
// for (var i = 0; i < testData.length; i++) {

//     testData[i];

// }

