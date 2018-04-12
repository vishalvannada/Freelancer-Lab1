var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('users');

            coll.findOne({username: msg.username}, function (err, user) {
                if (user) {
                    console.log(typeof(user))
                    res.code = "200";
                    res.value = "Success Login";
                    res.result = user;

                } else {
                    res.code = "401";
                    res.value = "Failed Login";
                    res.result = {}
                }

                console.log('callback')
                callback(null, res);
            });
        });
    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {});
    }
}

exports.handle_request = handle_request;