// imports
const models = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors");
const pipeline = promisify(require("stream").pipeline);

// Permet d'upload une photo
exports.uploadProfil = async (req, res, next) => {
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
    return res.status(401).send({ errors });
  }

  const filename = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${filename}`
    )
  );

  try {
    const user = await models.User.findOne({
      attributes: ["pictureUrl", "id"],
      where: { id: req.body.userId },
    });
    await user
      .update({
        pictureUrl: "./uploads/profil/" + filename,
      })
      .then(res.status(201).send({ message: "photo ajouté !" }))
      .catch((error) => res.status(400).send(error));
  } catch (error) {
    res.status(500).send({ error });
  }
};
