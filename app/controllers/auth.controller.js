const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require('validator')

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    if(!validator.isEmail(req.body.email)){
      return res.status(400).send({error: `wrong email`})
    }
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(404).send({ error: "user with this email already exists" });
    }

     user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    
    if (user) res.send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ error: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        error: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

