var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var bcrypt = require('bcryptjs');


router.post('/', function (req, res, next) {

    console.log(req.param('email'));
    console.log(req.param('username'));
    console.log(req.param('password'));
    console.log(req.param('confirmPassword'));

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.param('password'), salt);
    console.log(hash);

    console.log(bcrypt.compareSync(req.param('password'), hash));


    var getEmail = "select * from users where (email='" + req.param("email") + "')";

    console.log("Query is:" + getEmail);

    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else if (result.length > 0) {
            console.log(1);
            res.status(401).json({message: "An account is associated with this email already, " +
                "Please login with your existing details"})
        }
        else {

            console.log(1);
            var getUser = "select * from users where (username='" + req.param("username") + "')";
            mysql.fetchData(function (err, result) {
                if (err) {
                    throw err;
                }
                else if (result.length > 0) {
                    console.log(2);
                    res.status(401).json({message: "Username already exits, please use another one"})
                }
                else {
                    var insertUser = "INSERT INTO users (username, password, email) VALUES ('" +
                        req.param("username") + "','" + hash + "','" + req.param("email") + "')";
                    mysql.fetchData(function (err, result) {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log(3);

                            req.session.username = req.param('username');
                            req.session.email = req.param('email');

                            res.status(201).send("YES");
                        }
                    }, insertUser);
                }
            }, getUser)
        }
    }, getEmail);


});


module.exports = router;
