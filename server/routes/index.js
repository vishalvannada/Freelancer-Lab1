var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var kafka = require('./kafka/client')
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, req.session.username + '-' + Date.now() + '.jpeg')
    }
});

var upload = multer({storage: storage});

var type = upload.single('mypic');

router.post('/upload', type, function (req, res, next) {

    if (req.session) {
        console.log(req.file.filename);
        var username = req.session.username;

        kafka.make_request('imageUpload_topic', {
            username: username,
            image: req.file.filename,
        }, function (err, results) {
            console.log('in result');
            if (results.code == 200) {
                console.log(results);
                res.status(201).send(results.result)
            }
            else {
                res.status(401).json({
                    message: results.message
                })
            }

        });
    }
    else {
        res.status(401).end()
    }

});


router.get('/', function (req, res) {
    if (req.session) {
        var username = req.session.username;
        kafka.make_request('profile_topic', {"username": username,}, function (err, results) {

            if (results.code == 200) {
                console.log(results);
                // req.session.username = req.param('username');
                res.status(201).send(results.result)
            }
            else {
                console.log('roo', results);
                res.status(401).end()
            }

        });
    }
    else {
        console.log("NoValid");
        res.status(401).send("NO")
    }
});


router.post('/savedetails', function (req, res, next) {


    if(req.session){
        const username = req.param('username');
        const email = req.param('email');
        let phoneNumber = '';
        let aboutMe = '';
        let skills = '';

        if (req.param('phoneNumber')) {
            phoneNumber = req.param('phoneNumber');
        }

        if (req.param('aboutMe')) {
            aboutMe = req.param('aboutMe');
        }

        if (req.param('skills')) {
            skills = req.param('skills');
        }

        kafka.make_request('saveProfileDetails_topic',
            {
                oldname : req.session.username,
                username: username,
                aboutMe: aboutMe,
                skills: skills,
                phoneNumber : phoneNumber,
                email : email,
            },

            function (err, results) {
                console.log('in result');
                if (results.code == 200) {
                    console.log(results);
                    res.status(201).send(results.result)
                }
                else {
                    res.status(401).json({
                        message: results.message
                    })
                }

            });
    }
    else{
        res.status(401).end();
    }

})

router.get('/loadprojects', function (req, res, next) {

    if (req.session.username) {
        console.log("gere jhb")
        var username = req.session.username;

        var getUser = "select *, (select count(bids.projectid) from test.bids where projects.projectid = bids.projectid)" +
            "as bidcount from projects where username != '" + username + "'";

        console.log("Query is:" + getUser);
        mysql.fetchData(function (err, results,) {
            if (err) {
                throw err;
            }
            else {
                console.log(results)
                res.status(201).send(results);
            }
        }, getUser);
    }
    else {
        res.status(401).end()
    }

});


router.get('/project', function (req, res, next) {

    if (req.session.username) {
        console.log("gere jhb")
        console.log(req.param('id'))

        const id = req.param('id')


        var username = req.session.username;

        var getUser = "select * from projects where projectid = '" + id + "'";

        // SELECT bidid, bids.username, projectid, period, amount, imagename FROM test.bids join test.users on test.bids.username = test.users.username
        var getBids = "select bidid, bids.username, projectid, period, amount, imagename from bids join users on bids.username = users.username where " +
            "projectid = '" + id + "'";
        var getFiles = "select * from files where projectid = '" + id + "'";


        let project = {};
        let bids = {}

        console.log("Query is:" + getUser);
        mysql.fetchData(function (err, results,) {
            if (err) {
                throw err;
            }
            else {
                console.log(" 3 " + results);
                // res.json({
                //     project : results,
                // })
                project = results;

                mysql.fetchData(function (err, results,) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("1" + results);
                        // res.status(201).send(results);
                        // res.json({
                        //     bids : results,
                        // })

                        bids = results;
                        mysql.fetchData(function (err, results,) {
                            if (err) {
                                throw err;
                            }
                            else {
                                console.log("2" + results);
                                res.status(201).json({
                                    files: results,
                                    project: project,
                                    bids: bids,
                                    username: req.session.username,
                                })
                            }
                        }, getFiles);
                    }
                }, getBids);
            }
        }, getUser);
    }
    else {
        res.status(401).end()
    }

});

router.post('/savebid', function (req, res, next) {

    const projectid = req.param('projectid');
    const amount = req.param('amount');
    const days = req.param('days');

    console.log("here" + " " + projectid + amount + days)

    // INSERT INTO `test`.`bids` (`username`, `projectid`, `period`, `amount`) VALUES ('hk', '14', '10', '150');

    if (req.session.username) {
        const insertBid = "insert into bids (username, projectid, period, amount) values ('" + req.session.username + "', '" +
            projectid + "','" + days + "','" + amount + "')";

        console.log("q0 " + insertBid);

        mysql.fetchData(function (err, results) {
            if (err) {
                throw err;
            }
            else {
                console.log(results)
            }
        }, insertBid)
    }
})


router.get('/getmyprojects', function (req, res, next) {

    if (req.session.username) {
        var username = req.session.username;

        // SELECT *, (select round(avg(bids.amount)) from test.bids where projects.projectid = bids.projectid)as avg
        // FROM test.projects where username = 'hk';

        var getPublishedProjects = "select *, (select round(avg(bids.amount)) from test.bids where projects.projectid = bids.projectid)as avg  from projects where username = '" + username + "'";
        // console.log("Query is:" + getUser);

        let publishedProjects = {};
        mysql.fetchData(function (err, results,) {
            if (err) {
                throw err;
            }
            else {

                console.log(results)
                publishedProjects = results;

                // SELECT bidid, bids.username as bidder, amount, projects.projectid, projectname, projectdesc, skills, projects.username as owner, (select round(avg(bids.amount)) from test.bids where projects.projectid = bids.projectid) as avg FROM test.projects join
                // test.bids where bids.username = 'hk' and projects.projectid = bids.projectid

                var getBidProjects = "SELECT bidid, bids.username as bidder, amount, projects.projectid, projectname, projectdesc, skills, budgetrange, projects.username as owner, (select round(avg(bids.amount)) from test.bids where projects.projectid = bids.projectid) as avg FROM projects join" +
                    " bids where bids.username = '" + username + "' and projects.projectid = bids.projectid";
                // console.log("Query is:" + getUser);
                mysql.fetchData(function (err, results,) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log(results)
                        //  console.log("Valid");
                        //   console.log(results);
                        res.status(201).json({
                            publishedProjects: publishedProjects,
                            bidProjects: results,
                        })

                    }
                }, getBidProjects);
            }
        }, getPublishedProjects);
    }
    else {
        res.status(401).send("NO")
    }


});

router.get('/getuserprofile', function (req, res) {

    if (req.session.username) {

        const username = req.param('username')
        const getUser = "select * from users where username = '" + username + "'";

        mysql.fetchData(function (err, results) {
            if (err) {
                throw err;
            }
            else {
                res.status(201).send(results);
                console.log(results)
            }
        }, getUser)

    }
})

module.exports = router;



