var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';

function handle_request(msg, callback) {
    var res = {};
    // console.log("In handle request:"+ JSON.stringify(msg));
    try {
        console.log('jjjjjj');
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('users');


            coll.findOne({email: msg.email}, function (err, user) {
                if (user) {
                    res.code = "401";
                    res.message = "An account is associated with this email already, " +
                        "Please login with your existing details";
                    callback(null, res);
                } else {
                    coll.findOne({username: msg.username}, function (err, user) {
                        if (user) {
                            res.code = "401";
                            res.message = "Username already exits, please use another one";
                            callback(null, res);
                        } else {
                            coll.insert({
                                username: msg.username,
                                password: msg.password,
                                email: msg.email
                            }, function (err, user) {
                                if (user) {
                                    // done(null, {username: username, password: password});
                                    console.log(typeof(user))
                                    res.code = "200";
                                    res.value = "Success Login";
                                    res.message = '';
                                    callback(null, res);

                                } else {
                                    res.code = "401";
                                    res.value = "Failed Login";
                                    res.message = '';
                                    callback(null, res);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {})
    }
}

exports.handle_request = handle_request;