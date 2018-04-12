var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('projects');

            var i = 0;


            coll.find({username: msg.username}).toArray(function (err, projects) {

                res.code = "200";
                res.value = "Success";
                res.result = projects;

                // console.log(projects, msg.username);
                //
                projects.forEach(project => {
                    console.log(project)
                })

                var coll2 = mongo.collection('bids');

                coll2.aggregate([{$match: {username: msg.username}}, {
                    $lookup: {
                        from: "projects",
                        localField: "projectid",
                        foreignField: "_id",
                        as: "bidProjects"
                    }
                }, {
                    $project: {
                        amount : 1,
                        project: "$bidProjects",
                    }
                }]).toArray(function (err, projects2) {

                    projects2.forEach(project => {
                        console.log(project)
                    })

                    res.publishedProjects = projects;
                    res.bidProjects = projects2;

                    callback(null, res);
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