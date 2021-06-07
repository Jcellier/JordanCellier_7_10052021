// Imports
import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [masked, setMasked] = useState(false);
  const [typeInput, setTypeInput] = useState("password");

  const mask = () => {
    setMasked(false);
    setTypeInput("password");
  };

  const unMask = () => {
    setMasked(true);
    setTypeInput("text");
  };

  // fonction qui permet de créer un utilisateur
  const handleRegister = async (e) => {
    e.preventDefault();
    // dom
    const terms = document.getElementById("terms");
    const usernameError = document.querySelector(".username.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    // on vide tous les innerHTML
    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    usernameError.innerHTML = "";

    // On gère les erreurs, il faut que les deux password correspondent et il faut accepter les conditions générales
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      // methode post, on passe l'email, l'username et le password en data
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          email,
          username,
          password,
        },
      })
        .then((res) => {
          // on attrape les erreurs en réponse
          if (
            res.data.errorEmail ||
            res.data.errorPassword ||
            res.data.errorUsername ||
            res.data.errors ||
            res.data.errorBrute
          ) {
            if (res.data.errorEmail) {
              emailError.innerHTML = res.data.errorEmail;
            }
            if (res.data.errorPassword) {
              passwordError.innerHTML = res.data.errorPassword;
            }
            if (res.data.errorUsername) {
              usernameError.innerHTML = res.data.errorUsername;
            }
            if (res.data.errors.username) {
              usernameError.innerHTML = res.data.errors.username;
            }
            if (res.data.errors.email) {
              emailError.innerHTML = res.data.errors.email;
            }
            if (res.data.errorBrute) {
              passwordError.innerHTML = res.data.errorBrute;
            }
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="username">Pseudo</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <div className="username error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <div className="password-container">
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
              type={typeInput}
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {masked === true && <i className="fas fa-eye" onClick={mask}></i>}
            {masked === false && (
              <i className="fas fa-eye-slash" onClick={unMask}></i>
            )}
          </div>
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type={typeInput}
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

// export
export default SignUpForm;
