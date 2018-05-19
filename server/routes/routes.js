//server/routes/routes.js
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var User = require('../../models/User');
var Token = require('../../models/Token');
var router = express.Router();
var crypto = require('crypto');


router.get('/', function(req, res){
    res.render('index')
});

router.route('/insert')
    .post(function(req, res) {

        var user = new User();
        user.email = req.body.email;
        user.password = req.body.password;


        user.save(function(err) {
           if (err) {
               console.log("error before mail");
               return res.send("Email Error");
           }

           var token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});

           token.save(function(err) {
               if (err) {return res.send(err.message)};

            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: '',
                    pass: ''
                }
            });


            let mailOptions = {
                from: '"Quan Chau" troublemakervn01@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: 'The Best Way To: Comfirm your email address', // Subject line
                text: 'Hi, \n\n Thank you for joining The Best Way To. Please click on the link below to verify your email. \nhttp:\/\/' +
                req.headers.host + '\/#\/confirmation\/' + token.token

            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error when mailing");
                   return  res.send(error.message);
                }
                res.send('A verification email has been sent to ' + req.body.email + '.');

            });
           });
        });
    });



router.route('/confirmation')
    .post(function(req, res, next) {
        Token.findOne({
            token: req.body.token
        }, function(err, token) {
            if (!token) return res.send('Confirmation link has expired. \nPlease log in to your account again to get a new confirmation link');

            User.findOne({_id: token._userId}, function (err, user) {
                if (!user) return res.send('Your account has been deleted');
                if (user.isVerified) return res.send('You have already confirmed your email address');

                user.isVerified = true;
                user.save(function (err) {
                    if (err) return res.send(err.message);
                    res.send("Your email address has been confirmed!");
                });
            })
        })
    })


router.route('/login')
    .post(function(req, res, next) {
       User.findOne({
           email: req.body.email,
           password: req.body.password,
       }, function(err, user) {
           if (!user) return res.send("Credentials are invalid");
           if (!user.isVerified) return res.send("VERIFY");

           res.send("DONE");
       })
    });

router.route('/resend-confirmation')
    .post(function(req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (!user) return res.send('No user found with this email address');
            if (user.isVerified) return res.send('This email address has already been confirmed');

            var token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});

            token.save(function (err) {
                if (err) {
                    return res.send(err.message)
                }
                ;

                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'troublemakervn01@gmail.com',
                        pass: 'junahisbest'
                    }
                });


                let mailOptions = {
                    from: '"Quan Chau" troublemakervn01@gmail.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: 'The Best Way To: Comfirm your email address', // Subject line
                    text: 'Hi, \n\n Thank you for joining The Best Way To. Please click on the link below to verify your email. \nhttp:\/\/' +
                    req.headers.host + '\/#\/confirmation\/' + token.token

                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.send(error.message);
                    }
                    res.send('A verification email has been sent to ' + req.body.email + '.');

                });

            })
        });
    });











module.exports = router;
