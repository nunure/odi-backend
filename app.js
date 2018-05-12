const express = require("express");
const winston = require("winston");

const configExpress = require("./src/config/express");

winston.cli();
winston.info("Server process starting");

const app = express();

const home = require("./src/routes/home/");
const questions = require("./src/routes/questions/");
const answers = require("./src/routes/answers/");
const errorHandler = require("./src/middleware/error-handler");
const notFound = require("./src/middleware/not-found");

// Déclaration des routes
configExpress(app);
app.use("/home", home.router);
app.use("/questions", questions.router);
app.use("/answers", answers.router);
app.use(errorHandler());
app.use(notFound());

module.exports = app;
