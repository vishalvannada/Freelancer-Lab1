var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

/* GET home page. */
router.post('/', function (req, res, next) {

    console.log(req.param('email'));
    console.log(req.param('username'));
    console.log(req.param('password'));
    console.log(req.param('confirmPassword'));

    var insertUser = "INSERT INTO users (username, password, email) VALUES ('"+
        req.param("username")+ "','" + req.param("password") + "','" + req.param("email") + "')";


    console.log("Here");

    console.log("Query is:" + insertUser);

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
    }, insertUser);
    res.render('index', {title: 'Express'});

});

module.exports = router;
