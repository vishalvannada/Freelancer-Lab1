var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var bcrypt = require('bcryptjs');
var kafka = require('./kafka/client')

router.post('/', function (req, res, next) {

    var email = req.param('email');
    var username = req.param('username');
    console.log(req.param('password'));
    console.log(req.param('confirmPassword'));

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.param('password'), salt);
    console.log(hash);
    console.log(bcrypt.compareSync(req.param('password'), hash));

    kafka.make_request('signUp_topic', {
        "email": email,
        "username": username,
        "password": hash
    }, function (err, results) {
        console.log('in result');

        if (results.code == 200) {
            console.log(results);
            req.session.username = req.param('username');
            res.status(201).send("Yes")
        }
        else {
            res.status(401).json({
                message : results.message
            })
        }

    });


});


module.exports = router;
