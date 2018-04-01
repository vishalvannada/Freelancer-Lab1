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
                current : page,
                pages : Math.ceil(results.count / perPage)
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

module.exports = router;
