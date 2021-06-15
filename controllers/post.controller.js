// Imports
const models = require("../models");
const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const verifyInput = require("../middleware/verifyInput");

// permet de créer un post
exports.createPost = async (req, res) => {
  let content = req.body.content;
  let userId = req.body.userId;
  let filename;

  // on valide le champ
  let contentTrue = verifyInput.validPost(content);

  if (content && contentTrue == false) {
    res.status(200).send({
      errors: {
        errorContent:
          "Vous devez utiliser entre 3 et 250 caractères et ne pas utiliser de caractères spéciaux !",
      },
    });
    res.status(400).send({ error: "error" });
  }

  if (req.file != null) {
    try {
      if (
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).send({ errors });
    }

    filename = userId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${filename}`
      )
    );
  }

  try {
    await models.Post.create({
      content: content,
      imageUrl: req.file != null ? "./uploads/posts/" + filename : "",
      UserId: userId,
      video: req.body.video,
    })
      .then((newPost) => res.status(201).send({ newPost }))
      .catch((error) => res.status(400).send({ error }));
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// permet de récupérer tous les posts
exports.readPost = async (req, res) => {
  try {
    const posts = await models.Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: models.User,
          attributes: ["username"],
        },
      ],
    });
    if (posts) {
      res.status(200).send(posts);
    } else {
      res.status(404).send({ error: "aucun message trouvé" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

// permet de récupérer un seul post
exports.readOnePost = async (req, res) => {
  let postId = req.params.id;
  try {
    const post = await models.Post.findOne({
      include: [
        {
          model: models.User,
          attributes: ["username"],
        },
      ],
      where: { id: postId },
    });
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).send({ error: "aucun message trouvé" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

// permet de modifier un post
exports.updatePost = async (req, res) => {
  let content = req.body.content;

  // on valide le champs
  let contentTrue = verifyInput.validPost(content);

  if (content && contentTrue == false) {
    res.status(200).send({
      errors: {
        errorUpdateContent:
          "Vous devez utiliser entre 3 et 250 caractères et ne pas utiliser de caractères spéciaux !",
      },
    });
    res.status(400).send({ error: "error" });
  }

  try {
    const post = await models.Post.findOne({
      where: { id: req.params.id },
    });

    await post
      .update({
        content: content,
      })
      .then((post) => res.status(200).send({ post }))
      .catch((error) => res.status(400).send({ error }));
  } catch (error) {
    res.status(500).send({ error });
  }
};

// permet de supprimer un post
exports.deletePost = async (req, res) => {
  const post = await models.Post.findOne({
    where: { id: req.params.id },
  });
  let filename = post.dataValues.imageUrl.split("/uploads/")[1];
  if (filename !== undefined) {
    fs.unlink(
      `${__dirname}/../client/public/uploads/${filename}`,
      function (err) {
        if (err) {
          console.log("error");
        } else {
          console.log("fichier supprimé");
        }
      }
    );
  }
  try {
    await models.Post.destroy({
      where: { id: req.params.id },
    })

      .then(
        res
          .status(200)
          .send({ message: "post " + req.params.id + " supprimé !" })
      )
      .catch((error) => res.status(400).send({ error }));
  } catch (error) {
    res.status(500).send({ error });
  }
};
