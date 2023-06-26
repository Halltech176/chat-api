const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH ");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // Respond with 200 OK status code
    res.sendStatus(200);
  } else {
    // Continue to the next middleware for other requests
    next();
  }
  // next();
});

app.use("/api/v1/auth", authRoutes);

module.exports = app;
