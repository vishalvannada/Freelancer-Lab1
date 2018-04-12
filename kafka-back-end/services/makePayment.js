var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';
var mongo1 = require('mongodb');

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            console.log(msg)
            var coll = mongo.collection('projects');
            var o_id = new mongo1.ObjectID(msg.projectid);
            coll.findOneAndUpdate({_id: o_id}, {
                    $set: {
                        status: 'CLOSED',
                    }
                },
                function (err, check) {
                    if (check) {
                        var coll2 = mongo.collection('users')
                        coll2.findOneAndUpdate({username: msg.owner}, {
                                $inc: {wallet: -parseInt(msg.bidAmount)}
                            },
                            function (err, check) {
                                if (check) {
                                    coll2.findOneAndUpdate({username: msg.bidder}, {
                                            $inc: {wallet: parseInt(msg.bidAmount)}
                                        },
                                        function (err, check) {
                                            if (check) {

                                                var coll3 = mongo.collection('transactions')
                                                coll3.insert({
                                                    owner: msg.owner,
                                                    bidder: msg.bidder,
                                                    amount: parseInt(msg.bidAmount),
                                                    projectid: o_id,
                                                    cardNumber: msg.cardNumber,
                                                    nameOnCard: msg.nameOnCard,
                                                    securityCode: msg.securityCode
                                                }, function (err, check) {
                                                    if (check) {
                                                        console.log(check)
                                                        res.code = "200";
                                                        res.message = '';
                                                        callback(null, res);
                                                    } else {
                                                        res.code = "401";
                                                        res.message = '';
                                                    }
                                                });

                                            }
                                        });

                                }
                            });

                    } else {
                        console.log(err)
                        res.code = "401";
                        res.message = '';
                        res.result = {}
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