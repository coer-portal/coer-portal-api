var defaultRoute = require('./default-route');
var studentGetByID = require('./student/student-get-by-id');
var studentRegister = require('./student/student-register');


module.exports = {
    defaultRoute: defaultRoute,
    studentGetByID: studentGetByID,
    studentRegister: studentRegister
}