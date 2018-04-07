var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var bcrypt = require('bcryptjs');
var passport = require('passport');
require('./passport')(passport);

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
                req.session.email = user.email
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
    if (req.session.username) {
        // console.log(req.session.username + req.session.email)
        res.status(201).send({
            username: req.session.username,
            email: req.session.email
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
