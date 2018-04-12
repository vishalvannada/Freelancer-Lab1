var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var bcrypt = require('bcryptjs');
var passport = require('passport');
require('./passport')(passport);
var kafka = require('./kafka/client')

router.post('/', function (req, res) {

    passport.authenticate('login', function (err, user) {
        if (err) {
            console.log("Login Error Vishal!")
        }
        if (!user) {
            console.log("No User");
            res.status(401).json({
                message: "The email or username you entered did not match our records." +
                " Please double-check and try again."
            });
        }
        else {

            if (bcrypt.compareSync(req.param('password'), user.password)) {
                req.session.username = user.username;
                req.session.email = user.email;

                // req.logIn(user, function (err) {
                //     if (err) {
                //         console.log(err)
                //     }
                // });

                res.status('200').send(user);


            }
            else {
                res.status(401).json({
                    message: "The password you entered does not match with the username." +
                    " Please double-check and try again."
                });
            }
        }
    })(req, res);

});


router.get('/logincheck', function (req, res) {

    console.log("request", req.user)
    console.log("request1", req.passport)
    console.log("request2", req.session)
    if (req.session.username) {
        // console.log(req.session.username + req.session.email)

        kafka.make_request('getCurrentUser_topic', {"username": req.session.username}, function (err, results) {
            console.log("here", results);
            // req.session.username = req.param('username');
            // res.status(201).json({
            //     user: results.result,
            // })

            if (results.result.image) {
                console.log("Image")
                res.status(201).send({
                    username: req.session.username,
                    email: req.session.email,
                    image: results.result.image
                });
            }
            else {
                res.status(201).send({
                    username: req.session.username,
                    email: req.session.email
                });
            }

        });


    }
    else {
        res.status(401).send("NO");
    }
});


router.get('/logout', function (req, res) {
    console.log(req.session.username)
    req.session.destroy();
    console.log(req.session)
    console.log('Session destroyed');
    res.status(201).send("Logged Out");
});

module.exports = router;
