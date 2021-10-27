const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const session = require("express-session");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.use(
  session({
    secret: "topsecret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 365 * 1000,
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  //Capture All 404 errors
  res.status(404).send("Page not found");
});

app.use("/", routes);

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
