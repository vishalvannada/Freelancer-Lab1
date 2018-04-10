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


    if (req.session) {
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
                oldname: req.session.username,
                username: username,
                aboutMe: aboutMe,
                skills: skills,
                phoneNumber: phoneNumber,
                email: email,
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
    else {
        res.status(401).end();
    }

})


router.post('/savebid', function (req, res, next) {

    const projectid = req.param('projectid');
    const amount = req.param('amount');
    const days = req.param('days');

    console.log("here" + " " + projectid + amount + days)

    // INSERT INTO `test`.`bids` (`username`, `projectid`, `period`, `amount`) VALUES ('hk', '14', '10', '150');

    if (req.session.username) {
        kafka.make_request('saveBid_topic',
            {
                username: req.session.username,
                email: req.session.email,
                projectid: projectid,
                amount: amount,
                period: days,
            }, function (err, results) {
                console.log('in result');

                console.log(results)
                res.status(201).end()
            });
    }
    else {
        res.status(401).end();
    }
})


router.get('/getuserprofile', function (req, res) {

    if (req.session) {
        const username = req.param('username')
        kafka.make_request('viewProfile_topic', {"username": username,}, function (err, results) {

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
        res.status(401).end();
    }
})


router.post('/makepayment', function (req, res, next) {

    if (req.session.username) {

        console.log(req.param('owner'))
        console.log(req.param('bidder'))
        console.log(req.param('bidAmount'))
        console.log(req.param('cardNumber'))
        console.log(req.param('nameOnCard'))
        console.log(req.param('securityCode'))

        kafka.make_request('makePayment_topic',
            {
                owner: req.param('owner'),
                bidder: req.param('bidder'),
                bidAmount: req.param('bidAmount'),
                cardNumber: req.param('cardNumber'),
                nameOnCard: req.param('nameOnCard'),
                securityCode: req.param('securityCode'),
                projectid: req.param('projectid')
            }, function (err, results) {
                console.log('in result');

                console.log(results)
                res.status(201).end()
            });
    }
    else {
        res.status(401).end();
    }
})

router.get('/gettrans', function (req, res) {

    if (req.session.username) {
        const username = req.session.username;
        kafka.make_request('getTransactions_topic', {"username": username,}, function (err, results) {

            console.log(results);
            // req.session.username = req.param('username');
            res.status(201).json({
                transIn: results.transIn,
                transOut: results.transOut,
                wallet: results.wallet
            })


        });
    }
    else {
        res.status(401).end();
    }
})

router.post('/addwithdraw', function (req, res, next) {

    console.log( req.param('amount'))
    if (req.session.username) {

        kafka.make_request('addWithdraw_topic',
            {
                username: req.session.username,
                amount: req.param('amount')
            }, function (err, results) {
                console.log('in result');

                console.log(results)
                res.status(201).end()
            });
    }
    else {
        res.status(401).end();
    }
})


router.get('/getcurrent', function (req, res) {

    if (req.session.username) {
        const username = req.session.username;
        kafka.make_request('getCurrentUser_topic', {"username": username}, function (err, results) {

            console.log("here", results);
            // req.session.username = req.param('username');
            res.status(201).json({
                user: results.result,
            })


        });
    }
    else {
        res.status(401).end();
    }
})

module.exports = router;



