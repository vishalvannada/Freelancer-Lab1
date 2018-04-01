var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client')
var multer = require('multer');

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
            console.log('in result', results);

            console.log(results.publishedProjects)

            res.status(201).json({
                publishedProjects: results.publishedProjects,
                bidProjects: [],
            })

            if (results.code == 200) {
                // res.status(204).end()
            }
            else {
                // res.status(401).end()
            }
        });

    }
    else {
        console.log("here")
        res.status(401).send("NO")
    }


});

router.get('/loadprojects', function (req, res, next) {

    if (req.session.username) {

        let perPage = 2;
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

            res.status(201).json({
                project: results.project,
                bids: [],
                username: req.session.username,
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

module.exports = router;
