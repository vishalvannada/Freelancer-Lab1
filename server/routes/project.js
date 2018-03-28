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

    if (req.session) {

        const projectName = req.body.projectName;
        const projDesc = req.body.projDesc;
        const skillsReq = req.body.skillsReq;
        const estBudget = req.body.estBudget;
        var username = req.session.username;

        kafka.make_request('postProject_topic', {
            "projectName": projectName,
            "projDesc": projDesc,
            "skillsReq": skillsReq,
            "estBudget" : estBudget,
            "username" : username
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

module.exports = router;
