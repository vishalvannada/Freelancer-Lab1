var mongo = require('./mongo');
var url = 'mongodb://localhost:27017/local'

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('projects');


            coll.find({username: {$ne: msg.username}}).skip((msg.perPage * msg.page) - msg.perPage)
                .limit(msg.perPage).
                toArray(function (err, projects) {

                console.log(projects, msg.username);

                projects.forEach(project => {
                    console.log(project)
                })

                coll.find({username: {$ne: msg.username}}).count( function (err, count) {
                    console.log("here",count)

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