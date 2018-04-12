var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in passport');
        kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                console.log("Here in passport")
                if(results.code == 200){

                    console.log("why not")
                    // passport.serializeUser(function(user, done) {
                    //     console.log('serializing user: ');
                    //     console.log(user);
                    //     done(null, user._id);
                    // });
                    //
                    // passport.deserializeUser(function(id, done) {
                    //     console.log(id)
                    //     console.log("heerer")
                    //     user.findById(id, function (err, user) {
                    //         console.log('no im not serial');
                    //         done(err, user);
                    //     });
                    // });


                    console.log("Here nn")
                    done(null,results.result);
                }
                else {
                    done(null,false);
                }
            }
        });
        /*try {
            if(username == "bhavan@b.com" && password == "a"){
                done(null,{username:"bhavan@b.com",password:"a"});
            }
            else
                done(null,false);
        }
        catch (e){
            done(e,{});
        }*/
    }));
};


