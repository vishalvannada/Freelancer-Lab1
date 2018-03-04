var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

/* GET home page. */
router.get('/', function (req, res, next) {
    var getUser="select * from users";
    console.log("Query is:"+getUser);

    mysql.fetchData(function (err, results,) {
        if(err){
            throw err;
        }
        else{
            if(results.length > 0){
                console.log("Valid");
                console.log(results);
            }
        }
    },getUser);
    res.render('index', {title: 'Express'});
});

module.exports = router;
