
// function to send Res code in bad cases
function sendResCode(code, response, msg) {

    response.statusCode = code;

    response.send(msg);

}

module.exports = sendResCode;