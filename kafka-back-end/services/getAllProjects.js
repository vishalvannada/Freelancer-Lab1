var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';
var mongo1 = require('mongodb');

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('projects');

            console.log(msg.perPage, msg.page)
            coll.aggregate([{$match: {username: {$ne: msg.username}}}, {
                $lookup: {
                    from: "bids",
                    localField: "_id",
                    foreignField: "projectid",
                    as: "bids"
                }
            }, {
                $project: {
                    _id: 1,
                    projectName: 1,
                    projDesc: 1,
                    skillsReq: 1,
                    estBudget: 1,
                    username : 1,
                    status : 1,
                    bidcount: {$size: "$bids"},
                }
            }]).skip((msg.perPage * parseInt(msg.page)) - msg.perPage)
                .limit(msg.perPage).toArray(function (err, projects){

            // coll.find({username: {$ne: msg.username}}).skip((msg.perPage * msg.page) - msg.perPage)
            //     .limit(msg.perPage).toArray(function (err, projects) {

                console.log(projects, msg.username);

                projects.forEach(project => {
                    console.log(project)
                })

                coll.find({username: {$ne: msg.username}}).count(function (err, count) {
                    console.log("here", count)

                    res.code = "200";
                    res.value = "Success";
                    res.projects = projects;
                    res.count = count;

                    callback(null, res);
                })

            });
        });
    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {});
    }
}

exports.handle_request = handle_request;