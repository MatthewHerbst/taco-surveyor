var express = require("express");
var harp = require("harp");
var Sequelize = require('sequelize');

/**************************************** SERVER INIT *********************************************/

var app = express();
var sequelize = new Sequelize('taco_surveyor', 'taco_master', 'ninja_warlord');

app.use(express.static(__dirname + "/dist"));
app.use(harp.mount(__dirname + "/dist"));

var port = process.env.PORT || 3333;
app.listen(port, function() {
  console.log("Listening on port " + port);
});

/****************************************** MODELS ************************************************/

var Survey = sequelize.define('survey', {
  name: Sequelize.STRING
}, {
  tableName: 'surveys'
});

var Question = sequelize.define('question', {
  prompt: Sequelize.STRING
}, {
  tableName: 'questions'
});

var Answer = sequelize.define('answer', {
  answer: Sequelize.STRING
}, {
  tableName: 'answers'
});

Survey.hasMany(Question, {as: 'Questions'});
Question.hasMany(Answer, {as: 'Answers'});

sequelize.sync().then(function () {
  console.log('Sync with MySQL success');
}, function (err) {
  console.error('Sync with MySQL failed:', err);
});

/******************************************** API *************************************************/

app.get('/get/question', function(req, res) {
  console.log(req);
  console.log('/get/question requested question for survey ' + req.params.surveyId);

  Question.findAll({
    where: {
      surveyId: req.params.surveyId
    },
    include: [{
      model: Answer,
      as: 'Answers'
    }]
  }).then(function (questions) {
    console.log('/get/question found question for survey ' + req.params.surveyId);
    res.setHeader('Cache-Control', 'no-cache');
    res.json(questions[0]);
  }, function (err) {
    console.error('/get/question failed getting question for survey ' + req.params.surveyId, err);
  });
});

app.get('/get/surveys', function(req, res) {
  console.log('/get/surveys requested survey list');

  Survey.findAll().then(function (surveys) {
    console.log('/get/surveys found survey list');
    res.setHeader('Cache-Control', 'no-cache');
    res.json(surveys);
  }, function (err) {
    console.error('/get/surveys failed:', err);
  });
});

app.get('/get/survey', function(req, res) {
  console.log('/get/survey requested survey ' + req.params.surveyId);

  Survey.findAll({
    where: {
      surveyId: req.params.surveyId
    }
  }).then(function (surveys) {
    console.log('/get/survey found survey ' + req.params.surveyId);
    res.setHeader('Cache-Control', 'no-cache');
    res.json(surveys[0]);
  }, function (err) {
    console.error('/get/survey failed getting survey ' + req.params.surveyId, err);
  });
});
