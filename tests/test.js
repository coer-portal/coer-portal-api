// unirest is required to do REST stuff in Node
var unirest = require('unirest');

// Check the type of test you want to do and pass it as an argument
if (process.argv[2] == "get") {
    var APIURL = "http://localhost:5000/student/" + process.argv[3];
    unirest
        .get(APIURL)
        .headers({ 'authkey': 'testingKEY' })
        .end(function (res) {
            console.log(res.body);
        });
}

if (process.argv[2] == "post") {
    var APIURL1 = "http://localhost:5000/register";
    unirest
        .post(APIURL1)
        .headers({ 'authkey': 'SUPERPRIVATE' })
        .query({
            ID: process.argv[3],
            name: "ISHAN JAIN",
            phoneno: 94567984314,
            fatherno: 7987465123,
            DOB: 24012016,
            currentStatus: "hostel"
        })
        .end(function (res) {
            console.log(res.raw_body)
        })
}
