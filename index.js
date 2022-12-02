const express = require("express");
const bodyParser = require('body-parser');

// Load environment variables
require('dotenv').config()

// test
console.log(process.env.BASE_URI);

// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/bikes";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// create webserver
const app = express();

const bikesRouter = require("./routers/bikesRouter");

// create route /
app.use("/bikes/", bikesRouter);

// start webserver on port 8000
app.listen(8000, () => {
    console.log("Express started");
})