var mongo = require('./mongo');
var url = 'mongodb://localhost:27017/local'

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);
            var coll = mongo.collection('bids');
            coll.insert({
                username: msg.username,
                projectid: msg.projectid,
                amount: msg.amount,
                period : msg.period,
            }, function (err, check) {
                if (check) {
                    console.log(check)
                    res.code = "200";
                    res.message = '';
                    // callback(null, res);

                } else {
                    res.code = "401";
                    res.message = '';
                    // callback(null, res);
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