"use strict";
const mongoose = require("mongoose");
const utils = require("../utils.js");
const { runTime } = require("../../utils.js");
const runtime = runTime();

const connection1 = require("./connection1.json")[runtime];
const connection5 = require("./connection2.json")[runtime];
const db = {
  connection1: { type: "mongo", creds: connection1 },
  connection5: { type: "mongo2", creds: connection5 },

};

module.exports = function (name) {
  if (db[name].type == "mongo") {
    return mongoose.createConnection(utils.mongoAddress(db[name].creds));
  }
  if (db[name].type == "mongo2") {
    return mongoose.createConnection(utils.mongoAddress2(db[name].creds));
  }
 
};

