var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

router.post('/', function (req, res) {

    const username = req.param("username");

    console.log("Here");
    var getUser = "select * from users where (username='" + username +
        "' or email='" + req.param("username") + "') and password='" + req.param("password") + "'";

    console.log("Query is:" + getUser);

    mysql.fetchData(function (err, results,) {
        if (err) {
            throw err;
        }
        else {
            if (results.length > 0) {
                req.session.username = results[0].username;
                req.session.email = results[0].email;
                res.status(201).send(results);
            }
            else {
                console.log("Not Valid");
                res.status(401).json({
                    message: "The email and password you entered did not match our records." +
                    " Please double-check and try again."
                });
            }
            console.log(results)
        }
    }, getUser);

});


router.get('/logincheck', function (req, res) {

    console.log(req.session);

    if (req.session.username) {
        // console.log(req.session.username + req.session.email)
        res.status(201).send({
            username : req.session.username,
            email : req.session.email
        });
    }
    else {
        res.status(401).send("NO");
    }
});

router.get('/logout', function (req, res) {
    console.log(req.session.username)
    req.session.destroy();
    console.log(req.session.username)
    console.log('Session destroyed');
    res.status(201).send("Logged Out");
});

module.exports = router;
