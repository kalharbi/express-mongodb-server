"use strict";

var MongoClient = require("mongodb").MongoClient;

module.exports = function(url) {
  if (url === "") {
    throw new TypeError("No URL is given.");
  }
  var connection;
  return function dbConnection(req, res, next) {
    if (!connection) {
      connection = MongoClient.connect(url);
    }
    connection
      .then(function(db) {
        req["db"] = db;
        next();
      })
      .catch(function(err) {
        connection = undefined;
        console.error("DB Connection failed ", err);
        next(err);
      });
  };
};
