// Imports
const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config({ path: "../config/.env" });

// constant
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Génération de tokens
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: maxAge,
  });
};

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await models.User.findOne({
          where: { id: decodedToken.id },
        });
        if (user) {
          res.locals.user = user;
          console.log(user);
          next();
        } else {
          res.status(400).send({ message: "l'utilisateur n'a pas été trouvé" });
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("no token !");
  }
};
