var mongo = require('./mongo');
var url = 'mongodb://localhost:27017/local';
var mongo1 = require('mongodb');


function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('projects');

            console.log(msg.id)
            var o_id = new mongo1.ObjectID(msg.id);
            coll.findOne({"_id": o_id}, function (err, project) {

                console.log(project);

                res.code = "200";
                res.value = "Success";
                res.project = project;


                callback(null, res);

                // projects.forEach(project => {
                //     console.log(project)
                // })
                //
                // coll.find({username: {$ne: msg.username}}).count( function (err, count) {
                //     console.log("here",count)
                //
                //     res.code = "200";
                //     res.value = "Success";
                //     res.projects = projects;
                //     res.count = count;
                //
                //     callback(null, res);
                // })
            });
        });
    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {});
    }
}

exports.handle_request = handle_request;