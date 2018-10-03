require("module-alias/register");
const express = require("express");
const winston = require("@config/winston");
const env = require("dotenv").config();

const configExpress = require("@config/express");

winston.info("Server process starting");

const app = express();

const questions = require("@routes/questions/");
const answers = require("@routes/answers/");
const errorHandler = require("@middleware/error-handler");
const notFound = require("@middleware/not-found");

// Déclaration des routes
configExpress(app);
app.use("/questions", questions.router);
app.use("/answers", answers.router);
app.use(errorHandler());
app.use(notFound());

module.exports = app;
