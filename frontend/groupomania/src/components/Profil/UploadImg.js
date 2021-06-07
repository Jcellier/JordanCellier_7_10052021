// Imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  // useState
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // dispatch
  const dispatch = useDispatch();
  // store
  const userData = useSelector((state) => state.userReducer);

  // fonction qui permet de modifier la photo de profil
  const handlePicture = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    // on crée un objet data
    const data = new FormData();
    data.append("name", userData.username);
    data.append("userId", userData.id);
    data.append("file", file);

    // on dispatch uploadPicture, on passe l'objet et l'id de l'utilisateur
    await dispatch(uploadPicture(data, userData.id));
    // on met à jour le store
    dispatch(getUser());
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <form action="" onSubmit={handlePicture} className="upload-pic">
          <label htmlFor="file">Changer d'image</label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </>
  );
};

// export
export default UploadImg;
