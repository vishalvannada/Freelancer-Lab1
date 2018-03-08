var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

/* GET home page. */
// router.post('/', function (req, res, next) {
//
//     console.log(req.param('email'));
//     console.log(req.param('username'));
//     console.log(req.param('password'));
//     console.log(req.param('confirmPassword'));
//
//     var insertUser = "INSERT INTO users (username, password, email) VALUES ('" +
//         req.param("username") + "','" + req.param("password") + "','" + req.param("email") + "')";
//
//
//     console.log("Here");
//
//     console.log("Query is:" + insertUser);
//
//     mysql.fetchData(function (err, result) {
//         if (err) {
//             throw err;
//         }
//         else if (result.length > 0) {
//             res.status(401).json({message: "Username already Used"})
//         }
//         else {
//             let userDetails = "insert into users1 values('" + reqUsername + "','" + newpass + "','" + reqfirstname + "','" + reqlastname + "')";
//             mysql.fetchData(function (err, result) {
//                 if (err) {
//                     throw err;
//                 }
//                 else {
//                     // finuser=reqUsername;
//                     res.status(201).json({message: "Account Created"})
//                 }
//             }, userDetails);
//         }
//     }, getusers);
//
//     mysql.fetchData(function (err, results,) {
//         if (err) {
//             throw err;
//         }
//         else {
//             if (results.length > 0) {
//                 console.log("Valid");
//                 console.log(results);
//                 res.status(201).send(results);
//             }
//             else {
//                 console.log("Not Valid");
//                 res.status(401).json({
//                     message: "The email and password you entered did not match our records." +
//                     " Please double-check and try again."
//                 });
//             }
//         }
//     }, insertUser);
//     res.render('index', {title: 'Express'});
//
// });


router.post('/', function (req, res, next) {

    console.log(req.param('email'));
    console.log(req.param('username'));
    console.log(req.param('password'));
    console.log(req.param('confirmPassword'));


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
                        req.param("username") + "','" + req.param("password") + "','" + req.param("email") + "')";
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
