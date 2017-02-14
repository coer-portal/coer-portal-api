const express = require('express'),
    Promise = require('bluebird'),
    LoginRouter = express.Router(),
    ValidateDeviceID = require('../../middlewares/ValidateDeviceID/ValidateDeviceID'),
    ValidateRequestData = require('../../middlewares/ValidateRequestData/ValidateRequestData'),
    CheckExistence = require('../../middlewares/CheckExistence/CheckExistence'),
    VerifyPassword = require('../../middlewares/VerifyPassword/VerifyPassword'),
    GenerateAccessToken = require('../../middlewares/GenerateAccessToken/GenerateAccessToken');

LoginRouter.post('*',
    (req, res, next) => {
        res.set({
            'Access-Control-Allow-Origin': '*'
        });
        req._deviceid = ValidateDeviceID(req.headers._deviceid);
        next();
    },
    (req, res, next) => {
        ValidateRequestData({
                _id: req.body._id,
                password: req.headers.password
            })
            .then(resolve => {
                if (resolve.error == 0) {
                    next();
                }
            }).catch(error => {
                res.send(JSON.stringify(error));
            });
    },
    (req, res, next) => {
        const db = req.app.locals.db,
            studentRecord = db.collection('studentRecord'),
            passwordVault = db.collection('passwordVault');

        CheckExistence({ _id: req.body._id, _deviceid: req._deviceid }, studentRecord, passwordVault)
            .then(result => {
                if (result.error == 'E103') {
                    next();
                } else {
                    res.send(JSON.stringify(result));
                }
            })
            .catch(error => {
                res.send(JSON.stringify(error));
            });
    },
    (req, res, next) => {
        const db = req.app.locals.db,
            passwordVault = db.collection('passwordVault');

        VerifyPassword({
                _id: req.body._id,
                password: req.headers.password,
                _deviceid: req._deviceid
            }, passwordVault)
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
        const redisClient = req.app.locals.redisClient,
            _id = req.body._id,
            _deviceid = req._deviceid;


        GenerateAccessToken({
                _id: _id,
                _deviceid: _deviceid
            }, redisClient)
            .then(result => {
                res.send(JSON.stringify(result));
            })
            .catch(error => {
                res.send(JSON.stringify(error));
            });
    }
);


module.exports = LoginRouter;