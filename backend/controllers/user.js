// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Controller pour la création de compte
exports.signup = (req, res, next) => {
  User.findOne({
    attributes: ["email"],
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 5, (err, pw) => {
          let newUser = User.create({
            email: req.body.email,
            username: req.body.username,
            password: pw,
            isAdmin: false,
          })
            .then((newUser) => {
              return res.status(201).json({
                message: "Utilisateur crée !",
                userId: newUser.id,
              });
            })
            .catch((err) => {
              return res.status(500).json({
                error: `${err}`,
              });
            });
        });
      } else {
        return res.status(200).json({
          error: "Adresse e-mail déjà utilisée !",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Erreur avec findOne",
        err: `${err}`,
      });
    });
};

// Controller pour le login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found!" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password!" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "SECRET_TOKEN", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ message: error }));
    })
    .catch((error) => res.status(500).json({ message: error }));
};
