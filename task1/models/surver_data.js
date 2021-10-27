const fs = require("fs");
const path = require("path");

let rawdata = fs.readFileSync(path.resolve(__dirname, "survey.json"));
let surveydata = JSON.parse(rawdata);
module.exports = surveydata;
