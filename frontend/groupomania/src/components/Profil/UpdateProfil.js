// Imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser, isEmpty } from "../Utils";
import axios from "axios";
import cookie from "js-cookie";

const UpdateProfil = () => {
  // useState
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [password, setPassword] = useState("");
  // store
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userErrors);
  // dispatch
  const dispatch = useDispatch();

  // fonction qui permet de modifier la bio
  const handleUpdate = () => {
    // on dispatch updateBio, on passe l'id de l'utilisateur et la nouvelle bio
    dispatch(updateBio(userData.id, bio));
    setUpdateForm(false);
  };

  // fonction qui permet de supprimer le compte de l'utilisateur
  const handleDelete = async (e) => {
    const passwordError = document.querySelector(".password.error");

    // fonction qui permet de supprimer le cookie
    const removeCookie = (key) => {
      if (window !== "undefined") {
        cookie.remove(key, { expires: 1 });
      }
    };

    // methode delete, on passe l'id de l'utilisateur en params et le password en data
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/${userData.id}`,
      data: { password },
      withCredentials: true,
    })
      .then(async function (res) {
        // on attrape l'erreur en réponse
        if (res.data.errorPassword) {
          // on affiche l'erreur à l'utilisateur
          passwordError.innerHTML = res.data.errorPassword;
        } else {
          // methode get pour supprimer le cookie
          await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
          })
            // on supprime le cookie jwt
            .then(() => removeCookie("jwt"))
            .catch((err) => console.log(err));

          // on actualise la page
          window.location = "/";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profil-container">
      <h1>Profil de {userData.username}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.pictureUrl} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
            {!isEmpty(error.errorBio) && (
              <p className="error">{error.errorBio}</p>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          {deleteForm === false && (
            <>
              <button onClick={() => setDeleteForm(!deleteForm)}>
                Supprimer le compte
              </button>
            </>
          )}
          {deleteForm && (
            <>
              <div className="form-password">
                <label htmlFor="password">Confirmer votre mot de passe</label>
                <div className="password error"></div>

                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Voulez-vous vraiment supprimer votre compte ?"
                      )
                    ) {
                      handleDelete();
                    }
                  }}>
                  Valider la suppression
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// export
export default UpdateProfil;
