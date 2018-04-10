var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signUp = require('./services/signUp');
var postProject = require('./services/postProject');
var profile = require('./services/profile');
var imageUpload = require('./services/imageUpload');
var saveProfileDetails = require('./services/saveProfileDetails');
var getMyProjects = require('./services/getMyProjects');
var getAllProjects = require('./services/getAllProjects');
var getOneProject = require('./services/getOneProject');
var saveBid = require('./services/saveBid');
var searchProjects = require('./services/searchProjects');
var hireFreelancer = require('./services/hireFreelancer');
var makePayment = require('./services/makePayment');
var getTransactions = require('./services/getTransactions');
var addWithdrawMoney = require('./services/addWithdrawMoney')

var topic_name1 = 'login_topic';
var consumer1 = connection.getConsumer(topic_name1);

var topic_name2 = 'signUp_topic';
var consumer2 = connection.getConsumer(topic_name2);

var topic_name3 = 'postProject_topic';
var consumer3 = connection.getConsumer(topic_name3);

var topic_name4 = 'profile_topic';
var consumer4 = connection.getConsumer(topic_name4);

var topic_name5 = 'imageUpload_topic';
var consumer5 = connection.getConsumer(topic_name5);

var topic_name6 = 'saveProfileDetails_topic';
var consumer6 = connection.getConsumer(topic_name6);

var topic_name7 = 'viewProfile_topic';
var consumer7 = connection.getConsumer(topic_name7);

var topic_name8 = 'getMyProjects_topic';
var consumer8 = connection.getConsumer(topic_name8);

var topic_name9 = 'getAllProjects_topic';
var consumer9 = connection.getConsumer(topic_name9);

var topic_name10 = 'getOneProject_topic';
var consumer10 = connection.getConsumer(topic_name10);

var topic_name11 = 'saveBid_topic';
var consumer11 = connection.getConsumer(topic_name11);

var topic_name12 = 'searchProjects_topic';
var consumer12 = connection.getConsumer(topic_name12);

var topic_name13 = 'hireFreelancer_topic';
var consumer13 = connection.getConsumer(topic_name13);

var topic_name14 = 'makePayment_topic';
var consumer14 = connection.getConsumer(topic_name14);

var topic_name15 = 'getTransactions_topic';
var consumer15 = connection.getConsumer(topic_name15);

var topic_name16 = 'addWithdraw_topic';
var consumer16 = connection.getConsumer(topic_name16);

var topic_name17 = 'getCurrentUser_topic';
var consumer17 = connection.getConsumer(topic_name17);



var producer = connection.getProducer();


consumer1.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    login.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer2.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    signUp.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer3.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    postProject.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer4.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    profile.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});



consumer5.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    imageUpload.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer6.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data);
    saveProfileDetails.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer7.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    profile.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer8.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    getMyProjects.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer9.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    getAllProjects.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});



consumer10.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    getOneProject.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer11.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    saveBid.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer12.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    searchProjects.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer13.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    hireFreelancer.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer14.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    makePayment.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer15.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    getTransactions.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});


consumer16.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    addWithdrawMoney.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});

consumer17.on('message', function (message) {
    console.log('message received');
    console.log(message)
    console.log(JSON.parse(message.value));
    var data = JSON.parse(message.value);
    console.log(data)
    profile.handle_request(data.data, function(err,res){
        console.log('after handle',res, err);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log('producer',data);
        });
        return;
    });
});