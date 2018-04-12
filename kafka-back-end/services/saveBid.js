var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';
var mongo1 = require('mongodb');

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);
            var coll = mongo.collection('bids');
            var projectid = new mongo1.ObjectID(msg.projectid);
            coll.insert({
                username: msg.username,
                email : msg.email,
                projectid: projectid,
                amount: parseInt(msg.amount),
                period : parseInt(msg.period),
            }, function (err, check) {
                if (check) {
                    console.log(check)
                    res.code = "200";
                    res.message = '';
                    callback(null, res);

                } else {
                    res.code = "401";
                    res.message = '';
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