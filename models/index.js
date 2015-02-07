// boilerplate to import all models in the folder
// taken from sequelize website

// make sure to have a method named "associate" in the class Methods
// this is used to build the association between various tables
"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var sequelize = new Sequelize('grabhalo', 'thirumal', 'thirumal', {
  dialect: "postgres",
  port:    5432,
});

// backend model reference object, used to expose everything in it
// for everyone to use
var db = {};

// read all files present in the folder except index.js
// ., .. and hidden files
// import each module into the db object
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

// Make associations if we have an association with the table
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// export stuff
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
