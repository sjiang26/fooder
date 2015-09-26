var express = require('express');
var router = express.Router();
var nedb = require('nedb');
var datastore = new nedb({
    filename: 'data/users.db'
});

router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        datastore.find({
            email: email
        }, function(err, docs) {
            if (err) {
                return next({
                    status: 500,
                    message: err
                });
            }
            if (docs == null || docs.length == 0 || docs[0].password != password) {
                return next({
                    status: 401
                });
            } else {
                var user = docs[0];
                res.status(201).json({
                    success: true,
                    user_id: user.id,
                    user_name: user.name
                });
            }
        });
    });
});

module.exports = router;