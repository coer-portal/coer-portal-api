var unirest = require('unirest');

function studentAttendance(req, res) {
    unirest
        .post('http://coer.ac.in/atten.php')
        .field('coerid', req.params['id'])
        .end(function (response) {
            if (response.error) {
                return response.error;
            } else {

                var attendance = {
                    "name": response.raw_body.split("<h3>")[1].split("</h3>")[0].split("Mr/Ms ")[1].split(" have")[0],
                    "attendance": response.raw_body.split("<h3>")[1].split("</h3>")[0].split("%")[0].substr(String.length - 6),
                    "attenLastUpdated": response.raw_body.split("<p>")[1].split("</p>")[0].split(" Update ")[1]
                }
                console.log("\n\t\t Found ID in Database\n" + JSON.stringify(attendance) + "\n\t\t Checking and Saving details to MongoDB");
                res.send(attendance);
            }
        });
}


module.exports = studentAttendance;