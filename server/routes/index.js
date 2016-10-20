var defaultRoute = require('./default-route');
var studentGetByID = require('./student/student-get-by-id');
var studentRegister = require('./student/student-register');
var studentAttendance = require('./student/student-attendance');

module.exports = {
    defaultRoute: defaultRoute,
    studentGetByID: studentGetByID,
    studentRegister: studentRegister,
    studentAttendance: studentAttendance
}