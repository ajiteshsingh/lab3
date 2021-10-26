const fs = require("fs");
const path = require("path");

const mainController = {
  landingPage(req, res) {
    res.sendFile(path.join(__dirname + "/../views/landing.html"));
  },
};

module.exports = mainController;
