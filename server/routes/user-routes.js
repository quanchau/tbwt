import {email, password} from '../../keys';

//server/routes/user-routes.js
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var User = require('../../models/User');
var Token = require('../../models/Token');
var router = express.Router();
var crypto = require('crypto');
var bcrypt = require('bcrypt');


router.get('/', function(req, res){
    res.render('index')
});

router.route('/insert')
    .post(function(req, res) {

        var user = new User();
        user.email = req.body.email;
        bcrypt.hash( req.body.password, 10, function(err, hash) {
            user.password = hash;
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
                            user: email,
                            pass: password
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
           email: req.body.email
       }, function(err, user) {
           if (!user) return res.send({message: "Credentials are invalid"});
           if (!user.isVerified) return res.send({message: "VERIFY"});
           bcrypt.compare(req.body.password, user.password, function(err, doesMatch) {
               if (doesMatch) {
                   return res.send({message: "DONE", id: user._id});
               } else {
                   return res.send({message: "Credentials are invalid"});
               }
           });

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
                        user: email,
                        pass: password
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

router.route('/reset-password')
    .post(function(req,res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (!user) return res.send("There is no account associated with this email address");
            var token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});

            token.save(function (err) {
                if (err) {
                    return res.send(err.message)
                }


                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: email,
                        pass: password
                    }
                });


                let mailOptions = {
                    from: '"Quan Chau" troublemakervn01@gmail.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: 'The Best Way To: Reset your password', // Subject line
                    text: 'Hi, \n\nPlease click on the link below to reset your password. \nhttp:\/\/' +
                    req.headers.host + '\/#\/reset-password\/' + token.token

                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.send(error.message);
                    }
                    res.send('A password reset link has been sent to ' + req.body.email + '.');

                });


            })

        })
    })

router.route('/reset-password-confirmation')
    .post(function(req,res) {
        Token.findOne({
            token: req.body.token
        }, function(err, token) {
            if (!token) return res.send('Link has expired. \nPlease reset your password again to get a new password reset link');

            User.findOne({_id: token._userId}, function (err, user) {
                if (!user) return res.send('Your account does not exist');

                bcrypt.hash( req.body.password, 10, function(err, hash) {
                    user.password = hash;
                    user.save(function (err) {
                        if (err) return res.send(err.message);
                        res.send("Your new password has been set!");
                    });
                });
            })
        })
    })





module.exports = router;
