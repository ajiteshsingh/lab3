const mainController = require("../controller");

const express = require("express");

const appRouter = express.Router();

appRouter.get("/", mainController.landingPage);
appRouter.get("/landing", mainController.landingPage);

module.exports = appRouter;
