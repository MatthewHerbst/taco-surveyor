var express = require("express"),
    harp = require("harp");

var app = express();

app.use(express.static(__dirname + "/dist"));
app.use(harp.mount(__dirname + "/dist"));

var port = process.env.PORT || 3333;
app.listen(port, function() {
  console.log("Listening on port " + port);
});
