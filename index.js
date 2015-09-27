var express = require("express");
var dbConnection = require("./dbConnection");

var app = express();

const dbUrl = "mongodb://" + process.env.ExpressMongo_USER + ":" +
  process.env.ExpressMongo_PW + "@" + process.env.ExpressMongo_HOST + ":" +
  process.env.ExpressMongo_PORT + "/" + process.env.ExpressMongo_DB;
app.use(dbConnection(dbUrl));

var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server is listening at http://%s:%s", host, port);
});

app.get("/find", function(req, res) {
  var queryText = req.query.q;
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (!queryText) {
    res.status(400)
      .json({
        message: "Query parameter q is missing."
      });
    return;
  }
  var collection = req.db.collection(process.env.ExpressMongo_COLLECTION);
  try {
    console.log("Received query: " + queryText);
    var queryObject = JSON.parse("[" + queryText + "]");
    var query = queryObject[0];
    var projection = queryObject[1] ? queryObject[1] : {};
  } catch (SyntaxError) {
    res.status(400)
      .json({
        message: "The given query does not contain a valid JSON object. " +
          "Please check your syntax (e.g. ensure you are using double quotes " +
          "around both your field names and values)."
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
