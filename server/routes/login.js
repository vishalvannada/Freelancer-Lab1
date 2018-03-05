var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

/* GET home page. */
router.post('/', function (req, res) {

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
            else{
                console.log("Not Valid");
                res.status(401).json({message : "Login Failed"});
            }
        }
    }, getUser);

});

module.exports = router;
