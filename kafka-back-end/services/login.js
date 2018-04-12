var mongo = require('./mongo');
var url = 'mongodb://cmpe273:sreedevi@ds139929.mlab.com:39929/freelancer_lab2';

function handle_request(msg, callback){
    var res = {};
    // console.log("In handle request:"+ JSON.stringify(msg));


    try {
        console.log('jjjjjj');
        mongo.connect(url, function(){
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('users');

            coll.findOne({
                $or: [ { username : msg.username }, { email : msg.username } ],
            }, function(err, user){
                if (user) {
                    // done(null, {username: username, password: password});
                    console.log(typeof(user))
                    res.code = "200";
                    res.value = "Success Login";
                    res.result = user;

                } else {
                    res.code = "401";
                    res.value = "Failed Login";
                    res.result = {}
                }

                console.log('callback')
                callback(null, res);
            });
        });
    }
    catch (e){
        console.log('hhhhhhhh');
        done(e,{});
    }

    // mongo.connect(url, function () {
    //
    // })
    // mongo.collection.findOne('users', {username : 'vishal'}, function (err, user) {
    //     if(err){
    //         console.log("VIshal False")
    //     }
    //     else
    //     {
    //         console.log("Vishal")
    //     }
    // })

    // if(msg.username == "bhavan@b.com" && msg.password =="a"){
    //     res.code = "200";
    //     res.value = "Success Login";
    // }
    // else{
    //     res.code = "401";
    //     res.value = "Failed Login";
    // }
    // callback(null, res);
}

exports.handle_request = handle_request;