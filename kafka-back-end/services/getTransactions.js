var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('transactions');
            var coll2 = mongo.collection('users');

            coll.find({"owner": msg.username}).toArray(function (err, transOut) {

                coll.find({"bidder": msg.username}).toArray(function (err, transIn) {

                    coll2.findOne({"username": msg.username}, function (err, wallet) {

                        res.transIn = transIn;
                        res.transOut = transOut;
                        res.wallet = wallet.wallet;

                        callback(null, res);
                    });
                });
            });

        });

    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {});
    }
}

exports.handle_request = handle_request;