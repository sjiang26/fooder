var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var nedb = require('nedb');
var datastore = new nedb({
    filename: 'data/users.db'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        var users = datastore.getAllData();
        res.status(200).json({
            users: users
        });
    });
});

router.get('/:user_id', function(req, res, next) {
    var id = req.params.user_id;
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        datastore.find({
            id: id
        }, function(err, users) {
            if (err) {
                return next({
                    status: 500,
                    message: err
                });
            };
            var user = users[0];
            res.status(200).json({
                user: user
            });
        });
    });
});

router.put('/:user_id', function(req, res, next) {
    var id = req.params.user_id;
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        datastore.update({
            id: id
        }, {
            $set: req.body.user
        }, {}, function(err, numReplaced) {
            if (err) {
                return next({
                    status: 500,
                    message: err
                });
            }
            datastore.find({
                id: id
            }, function(err, docs) {
                if (err) {
                    return next({
                        status: 500,
                        message: err
                    });
                }
                res.status(200).json({
                    user: docs[0]
                });
            })
        });
    });
});

router.post('/', function(req, res, next) {
    if (!req.body.user) {
        return next({
            status: 400,
            message: "Bad request no user"
        });
    }

    var name = req.body.user.name;
    var email = req.body.user.email;
    var password = req.body.user.password;
    var allergies = req.body.user.allergies;
    var diet = req.body.user.diet;
    var user = new User(name, email, password, allergies, diet);
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        datastore.insert(user, function(err) {
            if (err) {
                return next({
                    status: 500,
                    message: err + " user:" + user
                });
            }
            res.status(201).json({
                user: user
            });
        })
    })
})

module.exports = router;
