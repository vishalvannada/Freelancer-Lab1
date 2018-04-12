var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);
            var coll = mongo.collection('users');
            console.log('vishal', msg)
            coll.findOneAndUpdate({username: msg.oldname}, {
                    $set: {
                        username: msg.username,
                        aboutMe: msg.aboutMe,
                        skills: msg.skills,
                        phoneNumber: msg.phoneNumber,
                        email: msg.email,
                    }
                }, {returnOriginal: false},
                function (err, check) {
                    if (check) {
                        console.log("cehe", check)
                        res.code = "200";
                        res.message = '';
                        res.result = check.value;
                        callback(null, res);

                    } else {
                        console.log(err)
                        res.code = "401";
                        res.message = '';
                        res.result = {}
                        callback(null, res);
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