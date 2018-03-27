var mongo = require('./mongo');
var url = 'mongodb://localhost:27017/local'

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));


    try {
        console.log('jjjjjj');
        mongo.connect(url, function(){
            console.log('Connected to mongo at: ' + url);

            var coll = mongo.collection('users');

            coll.findOne({username: msg.username, password:msg.password}, function(err, user){
                if (user) {
                    // done(null, {username: username, password: password});
                    console.log("True")
                    res.code = "200";
                    res.value = "Success Login";

                } else {
                    res.code = "401";
                    res.value = "Failed Login";

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