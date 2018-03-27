var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var bcrypt = require('bcryptjs');
var passport = require('passport')
require('./passport')(passport);

// var mongo = require("./mongo");
// var mongoURL = "mongodb://localhost:27017/demo";
//
// function handle_request(msg, callback){
//
//     var res = {};
//     console.log("In handle request:"+ JSON.stringify(msg));
//
//     try {
//         console.log('jjjjjj');
//         mongo.connect(mongoURL, function(){
//             console.log('Connected to mongo at: ' + mongoURL);
//             var coll = mongo.collection('users');
//
//             coll.findOne({username: msg.username, password:msg.password}, function(err, user){
//                 if (user) {
//                     // done(null, {username: username, password: password});
//                     res.code = "200";
//                     res.value = "Success Login";
//
//                 } else {
//                     res.code = "401";
//                     res.value = "Failed Login";
//
//                 }
//
//                 callback(null, res);
//             });
//         });
//     }
//     catch (e){
//         console.log('hhhhhhhh')
//         done(e,{});
//     }
//
// }
//
// exports.handle_request = handle_request;

router.post('/', function (req, res) {

    // const username = req.param("username");
    // var getUser = "select * from users where (username='" + username +
    //     "' or email='" + req.param("username") + "')";
    //
    // console.log("Query is:" + getUser);
    // mysql.fetchData(function (err, results,) {
    //     if (err) {
    //         throw err;
    //     }
    //     else {
    //         if (results.length > 0) {
    //             console.log(results[0].password)
    //             if(bcrypt.compareSync(req.param('password'),results[0].password)){
    //                 req.session.username = results[0].username;
    //                 req.session.email = results[0].email;
    //                 res.status(201).send(results);
    //             }
    //             else{
    //                 res.status(401).json({
    //                     message: "The password you entered does not match with the username." +
    //                     " Please double-check and try again."
    //                 });
    //             }
    //
    //         }
    //         else {
    //             console.log("Not Valid");
    //             res.status(401).json({
    //                 message: "The email or username you entered did not match our records." +
    //                 " Please double-check and try again."
    //             });
    //         }
    //         // console.log(results)
    //     }
    // }, getUser);

    passport.authenticate('login', function (err, user) {
        if(err){
            console.log("Login Error Vishal!")
        }

        if(!user){
            console.log("No User")
        }

        console.log("Vishal")
    })(req,res);

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
