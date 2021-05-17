//fichier comprenant les fonctions de vérification des inputs des users
module.exports = {
  validEmail: function (value) {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(value);
  },
  validPassword: function (value) {
    //8 caractères dont au minimum une majuscule, une minuscule, un caractère numérique et un caractère spécial
    const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,24})/;
    return regexPassword.test(value);
  },
  validUsername: function (value) {
    const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,12}$/;
    return usernameRegex.test(value);
  },
  validPost: function (value) {
    const regex = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.?!,_\s-]{2,250}$/;
    return regex.test(value);
  },
  validComment: function (value) {
    const regex = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.?!,_\s-]{2,150}$/;
    return regex.test(value);
  },
  validBio: function (value) {
    const regex = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.?!,_\s-]{2,150}$/;
    return regex.test(value);
  },
};
