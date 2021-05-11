// Imports
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
require("dotenv/config");
const path = require("path");
const app = express();

// Headers CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(helmet());

module.exports = app;
