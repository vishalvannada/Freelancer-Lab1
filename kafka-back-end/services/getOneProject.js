var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';
var mongo1 = require('mongodb');


function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('projects');

            console.log(msg.id);
            var o_id = new mongo1.ObjectID(msg.id);
            coll.findOne({"_id": o_id}, function (err, project) {

                // console.log(project);
                // var id = project._id.toString();
                var coll2 = mongo.collection('bids');
                coll2.aggregate([
                    {$match: {"projectid": project._id}},
                    {
                        $lookup: {
                            from: "users",
                            localField: "username",
                            foreignField: "username",
                            as: "image"
                        }
                    },
                    {$unwind: "$image"},
                    {
                        $project: {
                            _id: 1,
                            projectid: 1,
                            amount: 1,
                            period: 1,
                            username: 1,
                            email : 1,
                            image: "$image.image",
                        }
                    }
                ]).toArray(function (err, bids) {

                    console.log(bids, msg.username);

                    res.code = "200";
                    res.value = "Success";
                    res.project = project;
                    res.bids = bids;

                    coll2.aggregate([
                        {$match: {"projectid": project._id}},
                        {
                            $group:
                                {
                                    _id: {"projectid": project._id},
                                    avgBid: { $avg: "$amount" }
                                }
                        }
                    ]).toArray(function (err, avgBid) {

                        console.log("avgBid", avgBid);

                        res.code = "200";
                        res.value = "Success";
                        res.project = project;
                        res.bids = bids;
                        res.avgBid = avgBid;

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