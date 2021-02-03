const express = require("express");
var app = express();
var PORT = 3000 || process.env.PORT;
var fs = require("fs");

//configuring the database
const dbConfig = require('./config/dbConfig.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})


app.get("/", function (req, res) {
  res.send("Server is live.");
});

require('./routes/csv.route')(app);

app.listen(PORT, () => {
  console.log("Server is litening on " + PORT);
});
