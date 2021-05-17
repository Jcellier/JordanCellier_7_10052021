// Imports
const models = require("../models");
const verifyInput = require("../middleware/verifyInput");

// Permet de commenter un post
exports.commentPost = async (req, res) => {
  let userId = req.params.userId;
  let postId = req.params.id;
  let commenterId = req.body.commenterId;
  let content = req.body.content;

  // On valide le champs
  let contentTrue = verifyInput.validComment(content);

  if (content && contentTrue == false) {
    res.status(401).send({
      errors: {
        errorContentComment:
          "Vous devez utiliser entre 3 et 150 caractères et ne pas utiliser de caractères spéciaux !",
      },
    });
    res.status(401).send({ error: "error" });
  }

  try {
    // Création du commentaire
    const newComment = await models.Comment.create({
      postId: postId,
      userId: userId,
      commenterId: commenterId,
      content: content,
    });

    if (newComment) {
      res.status(201).send({ newComment });
    } else {
      res.status(401).send({ error: "Erreur dans la création du commentaire" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

// Permet de modifier un commentaire
exports.updatePost = async (req, res) => {
  let content = req.body.content;
  let commentId = req.params.id;

  // On valide le champ
  let contentTrue = verifyInput.validComment(content);

  if (content && contentTrue == false) {
    res.status(401).send({
      errors: {
        errorContentComment:
          "Vous devez utiliser entre 3 et 150 caractères et ne pas utiliser de caractères spéciaux !",
      },
    });
    res.status(400).send({ error: "error" });
  }

  try {
    const commentFound = await models.Comment.findOne({
      attributes: [
        "id",
        "userId",
        "postId",
        "commenterId",
        "content",
        "createdAt",
        "updatedAt",
      ],
      where: { id: commentId },
    });

    // Création du commentaire
    await commentFound
      .update({
        content: content,
      })
      .then((comment) => res.status(200).send({ comment }))
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    res.status(500).send({ error });
  }
};

// Permet de voir tous les commentaires
exports.readCommentPost = async (req, res) => {
  try {
    const comments = await models.Comment.findAll({
      attributes: [
        "id",
        "userId",
        "postId",
        "commenterId",
        "content",
        "createdAt",
        "updatedAt",
      ],
    });
    if (comments > []) {
      res.status(200).send(comments);
    } else {
      return res.status(400).send({ error: "il n'y a pas de commentaires" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

// Permet de supprimer un commentaire
exports.deleteCommentPost = async (req, res) => {
  try {
    let commentId = req.params.id;

    // On contrôle que le commentaire existe dans la DB
    const commentFound = await models.Comment.findOne({
      where: { id: commentId },
    });

    if (!commentFound) {
      return res.status(400).send({ error: "Commentaire non trouvé !" });
    }

    // Suppression du commentaire
    await models.Comment.destroy({
      where: { id: commentId },
    });
    res.status(200).send({ message: "commentaire supprimé" });
  } catch (error) {
    res.status(500).send({ error });
  }
};
