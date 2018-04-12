var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';
var ObjectID = require('mongodb').ObjectID;

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);
            var coll = mongo.collection('projects');
            console.log('vishal', msg)

            var objectId = new ObjectID(msg.projectid);
            coll.findOneAndUpdate({_id: objectId}, {
                    $set: {
                        status : 'IN PROGRESS',
                        freelancer : msg.bidder,
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