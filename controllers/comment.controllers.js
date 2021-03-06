// Imports
const models = require("../models");
const verifyInput = require("../middleware/verifyInput");

// permet de commenter un post
exports.commentPost = async (req, res) => {
  let userId = req.params.userId;
  let postId = req.params.id;
  let commenterId = req.body.commenterId;
  let content = req.body.content;

  // on valide le champ
  let contentTrue = verifyInput.validComment(content);

  if (content && contentTrue == false) {
    res.status(200).send({
      errors: {
        errorContentComment:
          "Vous devez utiliser entre 3 et 150 caractères et ne pas utiliser de caractères spéciaux !",
      },
    });
    res.status(400).send({ error: "error" });
  }

  try {
    // création du commentaire
    const newComment = await models.Comment.create({
      postId: postId,
      userId: userId,
      commenterId: commenterId,
      content: content,
    });

    if (newComment) {
      res.status(201).send({ newComment });
    } else {
      res.status(401).send({ error: "désolé, quelque chose à mal tourné" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

// permet de commenter un post
exports.updatePost = async (req, res) => {
  let content = req.body.content;
  let commentId = req.params.id;

  // on valide le champ
  let contentTrue = verifyInput.validComment(content);

  if (content && contentTrue == false) {
    res.status(200).send({
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

    // création du commentaire
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

// permet de voir tous les commentaires
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

exports.deleteCommentPost = async (req, res) => {
  try {
    let commentId = req.params.id;

    // on contrôle que le commentaire existe dans la bd
    const commentFound = await models.Comment.findOne({
      where: { id: commentId },
    });

    if (!commentFound) {
      return res.status(400).send({ error: "Commentaire non trouvé !" });
    }

    // suppression du commentaire
    await models.Comment.destroy({
      where: { id: commentId },
    });
    res.status(200).send({ message: "commentaire supprimé" });
  } catch (error) {
    res.status(500).send({ error });
  }
};
