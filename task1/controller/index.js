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
        let prevPage = req.session.lastpage;
        processCurrentPage(req);
        let lastpage = req.session.lastpage || 0;
        checkIfSessionExists(req);

        if (req.body.answer) {
          const id = questions.questions[prevPage].id;
          req.session.answers[id] = req.body.answer;
        }
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

function checkIfSessionExists(req) {
  if (!req.session.user) {
    req.session.user = req.body.username;
    req.session.lastpage = 0;
    req.session.answers = {};
  }
}

function processCurrentPage(req) {
  if (!("submit" in req.body)) {
    req.session.lastpage = 0;
  } else {
    if (req.body.submit == "previous") {
      req.session.lastpage -= 1;
    } else {
      req.session.lastpage += 1;
    }
  }
}

module.exports = mainController;
