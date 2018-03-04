var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

/* GET home page. */
router.post('/', function (req, res, next) {

    console.log(req.param);

    console.log("Here");
    var getUser = "select * from users where username='" + req.param("username") +
        "' and password='" + req.param("password") + "'";

    console.log("Query is:" + getUser);

    mysql.fetchData(function (err, results,) {
        if (err) {
            throw err;
        }
        else {
            if (results.length > 0) {
                console.log("Valid");
                console.log(results);
            }
        }
    }, getUser);
    res.render('index', {title: 'Express'});

});

module.exports = router;
