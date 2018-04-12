var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client')
var multer = require('multer');
const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport(transport[, defaults])

var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, req.session.username + '-' + Date.now() + file.originalname)
    }
});
var upload2 = multer({storage: storage2})
var type2 = upload2.array('uploads');

router.post('/postproject', type2, function (req, res, next) {

    if (req.session.username) {

        console.log(req.body)

        const projectName = req.body.projectName;
        const projDesc = req.body.projDesc;
        var skillsReq = req.body.skillsReq;
        const estBudget = req.body.estBudget;
        var username = req.session.username;
        skillsReq = skillsReq.split(',');
        const mapFiles = req.files.map(file => file.filename);

        kafka.make_request('postProject_topic', {
            "projectName": projectName,
            "projDesc": projDesc,
            "skillsReq": skillsReq,
            "estBudget": estBudget,
            "username": username,
            "files": mapFiles,
        }, function (err, results) {
            console.log('in result');

            if (results.code == 200) {
                res.status(204).end()
            }
            else {
                res.status(401).end()
            }
        });
    }
    else {
        res.status(401).end()
    }

});


router.get('/getmyprojects', function (req, res, next) {
    console.log(req.session.username)

    if (req.session.username) {
        var username = req.session.username;


        kafka.make_request('getMyProjects_topic', {
            "username": username,
        }, function (err, results) {
            // console.log('in result', results);

            console.log(results.bidProjects)

            res.status(201).json({
                publishedProjects: results.publishedProjects,
                bidProjects: results.bidProjects,
            })

        });

    }
    else {
        console.log("here")
        res.status(401).send("NO")
    }


});

router.get('/loadprojects', function (req, res, next) {

    if (req.session.username) {

        let perPage = 3;
        let page = req.param('page')
        console.log(page)

        kafka.make_request('getAllProjects_topic', {
            "perPage": perPage,
            "page": page,
            "username": req.session.username
        }, function (err, results) {
            console.log('in result', results);


            res.status(201).json({
                projects: results.projects,
                current: page,
                pages: Math.ceil(results.count / perPage)
            })

            if (results.code == 200) {
                // res.status(204).end()
            }
            else {
                // res.status(401).end()
            }
        });

        // console.log("gere jhb")
        //
        // console.log(req.param('page'))
        // var username = req.session.username;
        //
        // var getUser = "select *, (select count(bids.projectid) from test.bids where projects.projectid = bids.projectid)" +
        //     "as bidcount from projects where username != '" + username + "'";
        //
        // console.log("Query is:" + getUser);
        // mysql.fetchData(function (err, results,) {
        //     if (err) {
        //         throw err;
        //     }
        //     else {
        //         console.log(results)
        //         res.status(201).send(results);
        //     }
        // }, getUser);
    }
    else {
        res.status(401).end()
    }

});


router.get('/', function (req, res, next) {

    if (req.session.username) {

        console.log(req.param('id'))

        const id = req.param('id');

        kafka.make_request('getOneProject_topic', {
            "id": id
        }, function (err, results) {
            console.log('in result', results);

            // console.log(results.avgBid[0].avgBid)

            var avgBid = 0;
            if (results.avgBid.length > 0) {
                avgBid = results.avgBid[0].avgBid
            }

            res.status(201).json({
                project: results.project,
                bids: results.bids,
                username: req.session.username,
                avgBid: avgBid
            })


            // res.status(201).json({
            //     projects: results.projects,
            //     current : page,
            //     pages : Math.ceil(results.count / perPage)
            // })

            if (results.code == 200) {
                // res.status(204).end()
            }
            else {
                // res.status(401).end()
            }
        });


        //     var username = req.session.username;
        //
        //     var getUser = "select * from projects where projectid = '" + id + "'";
        //
        //     // SELECT bidid, bids.username, projectid, period, amount, imagename FROM test.bids join test.users on test.bids.username = test.users.username
        //     var getBids = "select bidid, bids.username, projectid, period, amount, imagename from bids join users on bids.username = users.username where " +
        //         "projectid = '" + id + "'";
        //     var getFiles = "select * from files where projectid = '" + id + "'";
        //
        //
        //     let project = {};
        //     let bids = {}
        //
        //     console.log("Query is:" + getUser);
        //     mysql.fetchData(function (err, results,) {
        //         if (err) {
        //             throw err;
        //         }
        //         else {
        //             console.log(" 3 " + results);
        //             // res.json({
        //             //     project : results,
        //             // })
        //             project = results;
        //
        //             mysql.fetchData(function (err, results,) {
        //                 if (err) {
        //                     throw err;
        //                 }
        //                 else {
        //                     console.log("1" + results);
        //                     // res.status(201).send(results);
        //                     // res.json({
        //                     //     bids : results,
        //                     // })
        //
        //                     bids = results;
        //                     mysql.fetchData(function (err, results,) {
        //                         if (err) {
        //                             throw err;
        //                         }
        //                         else {
        //                             console.log("2" + results);
        //                             res.status(201).json({
        //                                 files: results,
        //                                 project: project,
        //                                 bids: bids,
        //                                 username: req.session.username,
        //                             })
        //                         }
        //                     }, getFiles);
        //                 }
        //             }, getBids);
        //         }
        //     }, getUser);
    }
    else {
        res.status(401).end()
    }

});


router.get('/search', function (req, res, next) {
    if (req.session.username) {

        let perPage = 3;
        let page = req.param('page')
        // console.log(page)
        console.log(req.param('skillsReq'))
        // console.log()
        kafka.make_request('searchProjects_topic', {
            "perPage": perPage,
            "page": page,
            "username": req.session.username,
            "projectName": req.param('projectName'),
            "skillsReq": JSON.parse(req.param('skillsReq'))
        }, function (err, results) {
            console.log('in result', results);

            res.status(201).json({
                projects: results.projects,
                current: page,
                pages: Math.ceil(results.count / perPage)
            })

        });

    }
    else {
        res.status(401).end()
    }
});


router.post('/hire', function (req, res, next) {


    if (req.session.username) {
        // console.log(req.param('email'))
        let bidder = req.param('email').username
        let email = req.param('email').email
        let projectid = req.param('project')._id

        console.log(bidder, email, projectid)


        kafka.make_request('hireFreelancer_topic', {
            "bidder": bidder,
            "projectid": projectid,
        }, function (err, results) {
            console.log('in result', results);
            // res.status(201).json({
            //     projects: results.projects,
            //     current: page,
            //     pages: Math.ceil(results.count / perPage)
            // })

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vishalvannada9@gmail.com',
                    pass: 'sreedevi'
                }
            });
            //
            let mailOptions = {
                from: '"Freelancer 👻" <admin@freelancer.com>', // sender address
                to: email, // list of receivers
                subject: 'You have been hired for project ✔', // Subject line
                text: 'Hi, your bid has been selected, and you have been accepted, go login to freelancer and start working on your project', // plain text body
                html: '<b>Hi, your bid has been selected, and you have been accepted, go login to freelancer and start working on your project</b>' // html body
            };
            //
            // // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });

            res.status(201).json({projectid: projectid});
        });

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.ethereal.email',
        //     port: 587,
        //     auth: {
        //         user: 'lmmo6wub5dxi3ezg@ethereal.email',
        //         pass: 'pnErUVjqp8QQh2dPfR'
        //     }
        // });
        // setup email data with unicode symbols


    }
    else {
        res.status(401).json({id: projectid})
    }

})
;

module.exports = router;
