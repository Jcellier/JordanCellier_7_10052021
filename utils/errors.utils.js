exports.signUpErrors = (err) => {
  let errors = { username: "", email: "" };

  if (
    err.name === "SequelizeUniqueConstraintError" &&
    Object.keys(err.fields)[0].includes("Users.email")
  )
    errors.email = "Cet email est déjà enregistré";

  if (
    err.name === "SequelizeUniqueConstraintError" &&
    Object.keys(err.fields)[0].includes("Users.username")
  )
    errors.username = "Ce pseudo est déjà pris";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};

exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors;
};
