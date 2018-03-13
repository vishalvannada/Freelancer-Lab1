var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var fs = require('fs');
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
    if (req.session.username) {
        console.log("gere jhb")
        console.log(req);
        console.log(req.file.filename);
        var username = req.session.username;
        var getUser = "update users set imagename = '" + req.file.filename + "' where username = '" + req.session.username + "'";
        console.log("Query is:" + getUser);
        mysql.fetchData(function (err, results,) {
            if (err) {
                throw err;
            }
            else {
                console.log(results)
                var getUser = "select * from users where username = '" + username + "'";
                console.log("Query is:" + getUser);
                mysql.fetchData(function (err, results,) {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (results.length > 0) {
                            console.log("Valid");
                            console.log(results);
                            res.status(201).send(results);
                        }
                    }
                }, getUser);
            }
        }, getUser);
    }
    else {
        res.status(401).end()
    }

});

/* GET home page. */
router.get('/', function (req, res) {
    console.log(req.session)

    if (req.session.username) {
        var username = req.session.username;
        var getUser = "select * from users where username = '" + username + "'";
        console.log("Query is:" + getUser);
        mysql.fetchData(function (err, results,) {
            if (err) {
                throw err;
            }
            else {
                if (results.length > 0) {
                    //  console.log("Valid");
                    //   console.log(results);
                    res.status(201).send(results);
                }
            }
        }, getUser);
    }
    else {
        res.status(401).send("NO")
    }


});


router.post('/savedetails', function (req, res, next) {

    const username = req.param('username');
    const email = req.param('email');
    const phoneNumber = req.param('phoneNumber');
    const aboutme = req.param('aboutme');
    const skills = req.param('skills');


    var getUser = "update users set username = '" + username + "', email = '" + email + "',phonenumber = '" + phoneNumber + "' , aboutme= '" + aboutme + "',skills = '" + skills + "' where username = '" + username + "'";

    mysql.fetchData(function (err, results,) {
        if (err) {
            throw err;
        }
        else {
            if (req.session.username) {
                var getUser = "select * from users where username = '" + username + "'";
                console.log("Query is:" + getUser);
                mysql.fetchData(function (err, results,) {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (results.length > 0) {
                            console.log("Valid");
                            console.log(results);
                            res.status(201).send(results);
                        }
                    }
                }, getUser);
            }
            else {
                res.status(400).send("NO")
            }
        }
    }, getUser);
})

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

    console.log("hijhb")
    console.log(req.body)
    console.log(req.files)
    console.log("hijhb")


    if (req.session.username) {
        console.log("gere jhb")
        console.log(req.body);
        const projectName = req.body.projectName;
        const projDesc = req.body.projDesc;
        const skillsReq = req.body.skillsReq;
        const estBudget = req.body.estBudget;
        // console.log(req.file.filename);
        var username = req.session.username;

        // INSERT INTO `test`.`projects` (`projectname`, `projectdesc`, `skills`, `budgetrange`) VALUES ('test2', 'test2-test2', 'c++', '100');

        var getUser = "insert into projects (projectname,projectdesc,skills,budgetrange, username) values ('" +
            projectName + "','" + projDesc + "','" + skillsReq + "','" + estBudget + "','" + username + "')"

        console.log("Query is:" + getUser);
        mysql.fetchData(function (err, results,) {
            if (err) {
                throw err;
            }
            else {
                console.log(results.insertId)

                req.files.forEach((element)=> {
                    console.log(element.filename);

                    let query = "insert into files (projectid, filename) values('" + results.insertId + "','" + element.filename + "')";
                    mysql.fetchData(function (err, results,) {
                        if (err) {
                            throw err;
                        }
                        else {

                        }
                    }, query);
                });

                res.status(204).end();


                // INSERT INTO `test`.`files` (`projectid`, `filename`) VALUES ('1', 'vis');


                // console.log("Query is:" + getUser);

            }
        }, getUser);
    }
    else {
        res.status(401).end()
    }

});




router.get('/loadprojects', function (req, res, next) {

    if (req.session.username) {
        console.log("gere jhb")
        var username = req.session.username;

        var getUser = "select * from projects where username != '" + username + "'";

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
        //


        var getUser = "select * from projects where projectid = '" + id + "'";

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


module.exports = router;



