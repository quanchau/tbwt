var express = require('express');

var router = express.Router();
var Question = require('../../models/Question');
var Category = require('../../models/Category');

router.route('/post-question')
    .post(function(req, res) {
        var question = new Question();
        question._userId = req.body.userId;
        question.question_content = req.body.question_content;
        question.save(function(err) {
            if (err) return res.send({message: err.message});
            return res.send({message: "DONE"});
        })

    })

router.get('/questionList', function(req, res, next) {
    Question.find({}, function(err, questions) {
        res.send({questions: questions});
    })
});



module.exports = router;
