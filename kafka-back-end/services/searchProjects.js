var mongo = require('./mongo');
var url = 'mongodb://localhost:27017/local';
var mongo1 = require('mongodb');

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('projects');
            var regex = ".*" + msg.projectName + ".*"
            console.log(msg, regex);

            if (msg.skillsReq.length > 0) {
                coll.aggregate([{
                    $match: {
                        $and: [
                            {projectName: new RegExp(regex, 'i')},
                            {username: {$ne: msg.username}},
                            {skillsReq: {$elemMatch: {$in: msg.skillsReq}}}
                        ]
                    }
                }, {
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
                        username: 1,
                        status: 1,
                        bidcount: {$size: "$bids"},
                    }
                }]).skip((msg.perPage * parseInt(msg.page)) - msg.perPage)
                    .limit(msg.perPage).toArray(function (err, projects) {

                    // coll.find({username: {$ne: msg.username}}).skip((msg.perPage * msg.page) - msg.perPage)
                    //     .limit(msg.perPage).toArray(function (err, projects) {

                    console.log(projects, msg.username);

                    projects.forEach(project => {
                        console.log(project)
                    })

                    coll.find({
                        $and: [{projectName: new RegExp(regex, 'i')},
                            {username: {$ne: msg.username}},
                            {skillsReq: {$elemMatch: {$in: msg.skillsReq}}}]
                    }).count(function (err, count) {
                        console.log("here", count)

                        res.code = "200";
                        res.value = "Success";
                        res.projects = projects;
                        res.count = count;

                        console.log(res)

                        callback(null, res);
                    })

                });
            }
            else {
                coll.aggregate([{
                    $match: {
                        $and: [
                            {projectName: new RegExp(regex, 'i')},
                            {username: {$ne: msg.username}},
                        ]
                    }
                }, {
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
                        username: 1,
                        status: 1,
                        bidcount: {$size: "$bids"},
                    }
                }]).skip((msg.perPage * parseInt(msg.page)) - msg.perPage)
                    .limit(msg.perPage).toArray(function (err, projects) {

                    // coll.find({username: {$ne: msg.username}}).skip((msg.perPage * msg.page) - msg.perPage)
                    //     .limit(msg.perPage).toArray(function (err, projects) {

                    console.log(projects, msg.username);

                    projects.forEach(project => {
                        console.log(project)
                    })

                    coll.find({
                        $and: [{projectName: new RegExp(regex, 'i')},
                            {username: {$ne: msg.username}},
                        ]
                    }).count(function (err, count) {
                        console.log("here", count)

                        res.code = "200";
                        res.value = "Success";
                        res.projects = projects;
                        res.count = count;

                        console.log(res)

                        callback(null, res);
                    })

                });
            }

        });
    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {});
    }
}

exports.handle_request = handle_request;