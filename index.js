var express = require("express");
var dbConnection = require("./dbConnection");
var config = require("./config");

var app = express();

const dbUrl = "mongodb://" + config.host + ":" + config.port + "/" + config.db;
app.use(dbConnection(dbUrl));

var server = app.listen(6000, function() {
  var host = server.address()
    .address;
  var port = server.address()
    .port;
  console.log("Server is listening at http://%s:%s", host, port);
});

app.get("/find", function(req, res) {
  var queryText = req.query.q;
  var projectionText = req.query.p;
  if (!queryText) {
    res.status(400)
      .json({
        message: "Query parameter q is missing."
      });
    return;
  }
  var collection = req.db.collection(config.collection);
  try{
    var query = JSON.parse(queryText);
    var projection = projectionText ? JSON.parse(projectionText) : {};
  }
  catch(SyntaxError){
    res.status(400)
      .json({
        message: "The given query is not a valid JSON object."
      });
    return;
  }
  collection.find(query, projection)
    .toArray(function(err, docs) {
      if (err) {
        res.type("json")
          .status(404)
          .send({
            message: "Not found."
          });
      }
      res.json(docs);
    });
});
