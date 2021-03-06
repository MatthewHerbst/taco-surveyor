var express = require("express");
var harp = require("harp");
var Sequelize = require('sequelize');

/**************************************** SERVER INIT *********************************************/

var app = express();
var sequelize = new Sequelize('taco_surveyor', 'taco_master', 'taco_warlord');

app.use(express.static(__dirname + "/dist"));
app.use(harp.mount(__dirname + "/dist"));

var port = process.env.PORT || 3333;
app.listen(port, function() {
  console.log("Listening on port " + port);
});

/****************************************** MODELS ************************************************/

var Answer = sequelize.define('answer', {
  answer: Sequelize.STRING
}, {
  tableName: 'answers'
});

var Question = sequelize.define('question', {
  prompt: Sequelize.STRING
}, {
  tableName: 'questions'
});

var Record = sequelize.define('record', {

}, {
  tableName: 'records'
});

var User = sequelize.define('user', {
  name: Sequelize.STRING
}, {
  tableName: 'users'
});

Question.hasMany(Answer, {as: 'Answers'});
Record.belongsTo(Answer);
Record.belongsTo(Question);
User.hasMany(Record, {as: 'Records'});

sequelize.sync().then(function () {
  console.log('Sync with MySQL success');
}, function (err) {
  console.error('Sync with MySQL failed', err);
});

/******************************************** API *************************************************/

app.get('/login', function(req, res) {
  User.findOrCreate({ where: {name: req.query.username} })
      .spread(function(user, created) {
        console.log('User ' + user.name + (created ? ' created ' : ' found'));
        res.setHeader('Cache-Control', 'no-cache');
        res.json(user);
      });
});

app.get('/question', function(req, res) {
  console.log('Question requested for user ' + req.query.userId);

  Question.findOne({
    include: [
      {
        model: Answer,
        as: 'Answers'
      }
    ]
  }).then(function (question) {
    console.log('Question found for user ' + req.query.userId);
    res.setHeader('Cache-Control', 'no-cache');
    res.json(question);
  }, function (err) {
    console.error('Failed getting question for user ' + req.query.userId, err);
  });
});

app.get('/profile', function(req, res) {
  console.log('Records requested for user ' + req.query.userId);

  Record.findAll({
    where: {
      user: req.query.user
    }
  }).then(function (records) {
    console.log(records.length + ' records found for user ' + req.query.userId);
    res.setHeader('Cache-Control', 'no-cache');
    res.json(records);
  }, function (err) {
    console.error('Failed getting records for user ' + req.query.userId, err);
  });
});

app.get('/submit', function(req, res) {
  console.log('User ' + req.query.userId + ' submitted answer ' + req.query.answerId + ' for question ' + req.query.questionId);

  Record.create(
    {
      where: {
        answerId: req.query.answerId,
        questionId: req.query.questionId,
        userId: req.query.userId
      }
    })
    .then(function() {
        console.log('Answer submitted successfully');
        res.setHeader('Cache-Control', 'no-cache');
        res.json({success: 'yay!'});
    }, function(err) {
      console.error('ERROR: answer submit failed', err);
      res.setHeader('Cache-Control', 'no-cache');
      res.json({error: 'There was a problem submitting the answer.'});
    });
});
