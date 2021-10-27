const fs = require("fs");
const path = require("path");
const questions = require("../models/surver_data");
SURVEY = "survey";
MATCH = "match";
SET_PREFERENCE = "setpreferences";

const mainController = {
  landingPage(req, res) {
    res.render(path.join(__dirname + "/../views/landing"));
  },
  processUserInput(req, res) {
    const action = req.body.action || req.query.action;
    switch (action) {
      case SURVEY:
        if (!("submit" in req.body)) {
          req.session.lastpage = 0;
        }
        let lastpage = req.session.lastpage || 0;
        if (!req.session.user) {
          req.session.user = req.body.username;
          req.session.lastpage = 0;
          req.session.answers = {};
        }
        if (req.body.answer) {
          const id = questions.questions[lastpage].id;
          req.session.answers[id] = req.body.answer;
        }
        lastpage = req.session.lastpage;
        req.session.lastpage = lastpage;
        if (lastpage >= questions.questions.length - 1) {
          res.render(path.join(__dirname + "/../views/surveycomplete"));
          return;
        }
        const question = questions.questions[lastpage];
        const param = {
          page: lastpage,
          username: req.session.user,
          preference: req.session.preference,
          question: question,
          answer: req.session.answers[question.id],
          preference: req.session.preference || "horizontal",
        };
        if (req.body.submit == "previous") {
          req.session.lastpage -= 1;
        } else {
          req.session.lastpage += 1;
        }
        res.render(path.join(__dirname + "/../views/survey"), param);
        break;
      case SET_PREFERENCE:
        req.session.preference = req.body.preference;
        res.writeHead(301, {
          Location: req.headers.origin + "/controller?action=survey",
        });
        res.send();
        break;
    }
  },
  getPreference(req, res) {
    res.render(path.join(__dirname + "/../views/preferences"));
  },
};

module.exports = mainController;
