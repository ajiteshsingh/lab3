const fs = require("fs");
const path = require("path");
const lab3survey = require("../models/surver_data");
const modelUtility = require("../models/index");

const questions = lab3survey;

SURVEY = "survey";
MATCH = "match";
SET_PREFERENCE = "setpreferences";

const mainController = {
  landingPage(req, res) {
    try {
      res.render(path.join(__dirname + "/../views/landing"));
    } catch (err) {
      res.status(500).send("Something went wrong! Please try again");
    }
  },
  processUserInput(req, res) {
    /**
     * TODO refactor
     */
    try {
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
            res.render(path.join(__dirname + "/../views/surveycomplete"), {
              user: req.session.user,
            });
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
        case MATCH:
          const data = modelUtility.processMatches(req, res, (matches) => {
            res.render(path.join(__dirname + "/../views/match"), matches);
          });
          break;
      }
    } catch (err) {
      res.status(500).send("Something went wrong! Please try again");
    }
  },
  getPreference(req, res) {
    try {
      res.render(path.join(__dirname + "/../views/preferences"));
    } catch (err) {
      res.status(500).send("Something went wrong! Please try again");
    }
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
  if (req.query.action) {
    return;
  }
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
