var express = require("express");
var harp = require("harp");
var Sequelize = require('sequelize');

var app = express();
var sequelize = new Sequelize('database', 'user', 'pass');

app.use(express.static(__dirname + "/dist"));
app.use(harp.mount(__dirname + "/dist"));

var port = process.env.PORT || 3333;
app.listen(port, function() {
  console.log("Listening on port " + port);
});

var Survey = sequelize.define('survey', {
  name: Sequelize.STRING
}, {
  tableName: 'Surveys'
});

Survey.sync().then(function() {
  console.log('Survey table synch success');
}, function (err) {
  console.log('Survey table synch failed:', err);
});

app.get('/get/surveys', function(req, res) {
  console.log('get/surveys requested');

  res.setHeader('Cache-Control', 'no-cache');
  res.json(["omg is this going to work?"]);
});
