// Imports
const models = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/auth");
const verifyInput = require("../middleware/verifyInput");
const { signUpErrors } = require("../utils/errors");
require("dotenv").config({ path: "../.env" });

// Durée des cookies (3j)
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Permet de créer un utilisateur
exports.signUp = async (req, res) => {
  const { email, username, password, bio } = req.body;

  // On valide les champs
  let emailTrue = verifyInput.validEmail(email);
  let passwordTrue = verifyInput.validPassword(password);
  let usernameTrue = verifyInput.validUsername(username);

  if (usernameTrue == false) {
    res.status(401).send({
      errorUsername:
        "username non valid ! (Il doit contenir entre 3 et 36 caractères et ne pas contenir d'espaces ni de caractères spéciaux)",
    });
  }

  if (emailTrue == false) {
    res.status(401).send({ errorEmail: "email non valide !" });
  }

  if (passwordTrue == false) {
    res.status(401).send({
      errorPassword:
        "password non valide !(Il doit contenir entre 8 et 42 caractères, au moins un chiffre, une majuscule, une minuscule et un caractère spécial !",
    });
  }

  if (usernameTrue == true && emailTrue == true && passwordTrue == true) {
    // hash le password
    bcrypt.hash(password, 10).then(async function (hash) {
      try {
        // on crée l'utilisateur
        const user = await models.User.create({
          email,
          username,
          password: hash,
          bio,
          isAdmin: 0,
        });
        res.status(201).send({ user: user.id });
      } catch (err) {
        const errors = signUpErrors(err);
        res.status(500).send({ errors });
      }
    });
  }
};

// Permet de loger un utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // On contrôle que tous les champs soit rempli
  if (email == null || password == null) {
    res.status(401).send({ error: "paramètres manquants" });
  }
  try {
    // On contrôle si l'email existe dans la DB
    const user = await models.User.findOne({ where: { email: email } });
    if (!user) {
      res.status(200).send({ errorEmail: "Email inconnu" });
    }
    await bcrypt
      // On compare le password
      .compare(password, user.password)
      .then((valid) => {
        if (!valid) {
          res.status(401).send({ errorPassword: "Mot de passe incorrecte" });
        }
        // On crée un token est on le passe dans le cookie
        const token = generateToken(user.id);
        res.cookie("jwt", token, { httpOnly: true, maxAge });
        res.status(200).send({
          user: user.id,
        });
      })
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    res.status(500).send({ error });
  }
};

// Permet à l'utilisateur de se logout
exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
