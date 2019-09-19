const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const practices = require("./routes/api/practices");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize()); //initialize
require("./config/passport")(passport); //config

// Routes
app.use("/api/users", users);
app.use("/api/practices", practices);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server is up and running on port ${port} !`)
);
