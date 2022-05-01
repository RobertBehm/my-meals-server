const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://RobertBehm:Branchave@cluster0.wekxx.mongodb.net/smd-meals";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log("mongoDB connection is successful");
});

db.on("error", () => {
  console.log("mongoDB connection has failed");
});

module.exports = mongoose;
