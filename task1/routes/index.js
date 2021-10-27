const mainController = require("../controller");

const express = require("express");

const appRouter = express.Router();

appRouter.get("/", mainController.landingPage);
appRouter.get("/landing", mainController.landingPage);
appRouter.get("/controller", mainController.processUserInput);
appRouter.post("/controller", mainController.processUserInput);
appRouter.get("/preferences", mainController.getPreference);

module.exports = appRouter;
