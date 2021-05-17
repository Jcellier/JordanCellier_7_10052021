// Imports
const models = require("../models");
const bcrypt = require("bcrypt");
const verifyInput = require("../middleware/verifyInput");
const fs = require("fs");

// Permet de récuperer un utilisateur dans la DB
exports.getUser = async (req, res) => {
  try {
    const user = await models.User.findOne({
      attributes: [
        "id",
        "email",
        "username",
        "bio",
        "pictureUrl",
        "isAdmin",
        "createdAt",
        "updatedAt",
      ],
      where: { id: req.params.id },
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({
        error: "l'utilisateur " + req.params.id + " est introuvable !",
      });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

// permet de récupérer tous les utilisateurs dans la bd
exports.getAllUsers = async (req, res) => {
  try {
    const user = await models.User.findAll({
      attributes: [
        "id",
        "email",
        "username",
        "bio",
        "pictureUrl",
        "isAdmin",
        "createdAt",
        "updatedAt",
      ],
    });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: "Utilisateurs introuvable !" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

// Permet de modifier un utilisateur
exports.updateUser = async (req, res) => {
  let bio = req.body.bio;

  // on valide le champs
  let bioTrue = verifyInput.validBio(bio);

  if (bio && bioTrue == false) {
    res.status(401).send({
      errors: {
        errorBio:
          "Vous devez utiliser entre 3 et 150 caractères et ne pas utiliser de caractères spéciaux !",
      },
    });
    res.status(400).send({ error: "error" });
  }

  try {
    const user = await models.User.findOne({
      attributes: ["bio", "id"],
      where: { id: req.params.id },
    });
    await user
      .update({
        bio: bio,
      })
      .then(res.status(200).send({ message: "bio modifié !" }))
      .catch((error) => res.status(400).send(error));
  } catch (error) {
    res.status(500).send({ error });
  }
};

// Permet de supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const password = req.body.password;
  const user = await models.User.findOne({ where: { id: req.params.id } });

  // On récupère la picture
  let filename = user.dataValues.pictureUrl.split("/uploads/")[1];
  // On contrôle si la picture est celle par défaut
  let random = Object.is(filename, "profil/random-user.png");

  try {
    await bcrypt
      // on compare le password
      .compare(password, user.password)
      .then((valid) => {
        if (!valid) {
          res
            .status(401)
            .json({ errorPassword: "Le mot de passe ne correspond pas" });
        } else {
          user
            .destroy()
            .then(
              res.status(200).send({
                message: "Utilisateur " + req.params.id + " supprimé !",
              })
            )
            .catch((error) => res.status(400).send({ error }));

          if (!random) {
            fs.unlink(
              `${__dirname}/../client/public/uploads/${filename}`,
              function (err) {
                if (err) {
                  console.log("error");
                }
                console.log("fichier supprimé");
              }
            );
          }
        }
      })
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    res.status(500).send({ error });
  }
};
