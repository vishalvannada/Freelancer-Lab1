var mongo = require('./mongo');
var url = 'mongodb://localhost:27017/local'

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('projects');

            var i = 0;


            coll.find({username: msg.username}).toArray( function (err, projects) {

                res.code = "200";
                res.value = "Success";
                res.result = projects;

                console.log(projects, msg.username);

                projects.forEach(project => {
                    console.log(project)
                })

                res.publishedProjects = projects;

                callback(null, res);
            });
        });
    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {});
    }
}

exports.handle_request = handle_request;