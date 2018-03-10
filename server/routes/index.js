var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
});

var upload = multer({storage:storage});

var type = upload.single('mypic');

router.post('/upload', type, function (req, res, next) {
    console.log("gere jhb")
    console.log(req.body);
    console.log(req.file);
    res.status(204).end();
});


/* GET home page. */
router.get('/', function (req, res) {
    console.log(req.session)

    if(req.session.username){
        var username = req.session.username;
        var getUser="select * from users where username = '" + username + "'" ;
        console.log("Query is:"+getUser);
        mysql.fetchData(function (err, results,) {
            if(err){
                throw err;
            }
            else{
                if(results.length > 0){
                  //  console.log("Valid");
                 //   console.log(results);
                    res.status(201).send(results);
                }
            }
        },getUser);
    }
    else{
        res.status(401).send("NO")
    }


});

module.exports = router;
