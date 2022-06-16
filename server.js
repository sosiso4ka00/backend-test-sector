const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const fileUpload = require('express-fileupload')

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024},
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use("/media", express.static(__dirname + "/public"))

// database
const db = require("./app/models");
const User = db.user;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
})

// routes

require("./app/routes/user.routes")(app);
require("./app/routes/profile.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  User.create({
    name: "sos",
    password: "$2a$08$biS7kASozG6NFWtqwWOagOrQ2T2rnWenMpX3tn7qcDV8FLwn.qyqW",
    email: "sos@mail.com",  
  });
}
