var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';

function handle_request(msg, callback) {
    var res = {};
    try {
        mongo.connect(url, function () {
            console.log('Connected to mongo at: ' + url);
            var coll = mongo.collection('projects');
            coll.insert({
                projectName: msg.projectName,
                projDesc: msg.projDesc,
                skillsReq: msg.skillsReq,
                estBudget : msg.estBudget,
                username : msg.username,
                files : msg.files,
                status : 'OPEN'
            }, function (err, check) {
                if (check) {
                    console.log(check)
                    res.code = "200";
                    res.message = '';
                    callback(null, res);

                } else {
                    res.code = "401";
                    res.message = '';
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