const express = require('express'),
    Promise = require('bluebird'),
    ForgotPasswordRouter = express.Router(),
    ValidateDeviceID = require('../../middlewares/ValidateDeviceID/ValidateDeviceID'),
    ValidateRequestData = require('../../middlewares/ValidateRequestData/ValidateRequestData'),
    VerifyUserDetails = require('../../middlewares/VerifyUserDetails/VerifyUserDetails'),
    GenerateResetToken = require('../../middlewares/GenerateResetToken/GenerateResetToken');


ForgotPasswordRouter.post('*',
    (req, res, next) => {
        req._deviceid = ValidateDeviceID(req.headers._deviceid);
        next();
    },
    (req, res, next) => {
        ValidateRequestData({
                _id: req.body._id,
                phoneno: req.body.phoneno,
                fatherno: req.body.fatherno,
                _dob: req.body._dob,
                _apikey: req.headers._apikey
            })
            .then(resolve => {
                if (resolve.error == 0) {
                    next();
                }
            })
            .catch(error => {
                res.send(JSON.stringify(error));
            });
    },
    (req, res, next) => {
        const db = req.app.locals.db,
            studentRecord = db.collection('studentRecord');
        VerifyUserDetails({
                _id: req.body._id,
                phoneno: req.body.phoneno,
                fatherno: req.body.fatherno,
                _dob: req.body._dob,
                _deviceid: req.headers._deviceid
            }, studentRecord)
            .then(result => {
                if (result.error == 0) {
                    next();
                }
            })
            .catch(error => {
                res.send(JSON.stringify(error));
            });
    },
    (req, res, next) => {
        const redisClient = req.app.locals.redisClient;

        GenerateResetToken({
                _id: req.body._id,
                _deviceid: req.headers._deviceid
            }, redisClient)
            .then(result => {
                res.send(JSON.stringify(result));
            })
            .catch(error => {
                res.send(JSON.stringify(error));
            });

    });


module.exports = ForgotPasswordRouter;