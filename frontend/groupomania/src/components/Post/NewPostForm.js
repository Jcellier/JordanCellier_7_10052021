// Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";
import { timestamParser, isEmpty } from "../Utils";

const NewPostForm = () => {
  // useState
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  // store
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postErrors);
  // dispatch
  const dispatch = useDispatch();

  // fonction qui permet de créer un fichier file pour le passer en data, et un objet url pour l'afficher en prévisualisation
  const handlePicture = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  // fonction qui permet de créer un post
  const handlePost = async () => {
    // load spinner true
    setIsLoading(true);
    // on contrôle qu'il y a bien un post
    if (content || imageUrl || video) {
      // on crée un objet data
      const data = new FormData();
      data.append("userId", userData.id);
      data.append("content", content);
      if (file) data.append("file", file);
      data.append("video", video);

      // on dispatch addPost et on lui passe l'objet data
      await dispatch(addPost(data));
      // on dispatch getPosts pour récupérer l'id du post
      dispatch(getPosts());
      // on vide le formulaire
      cancelPost();
      // load spinner false
      setIsLoading(false);
      // on envoi une alerte si il n'y a pas de post
    } else {
      alert("Veuillez entrer un message");
    }
  };

  // fonction qui permet de vider le formulaire
  const cancelPost = () => {
    setContent("");
    setImageUrl("");
    setVideo("");
    setFile("");
  };

  // useEffect, prend en charge la vidéo
  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    // fonction qui permet de lire une vidéo youtube en dehors de youtube
    const handleVideo = () => {
      // on split le lien de la vidéo
      let findLink = content.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        // on cherche que le lien est un lien youtube
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          // on remplace le watch par embed
          let embed = findLink[i].replace("watch?v=", "embed/");
          // on retire le time à partir de &
          setVideo(embed.split("&")[0]);
          // on supprime le lien de la vidéo
          findLink.splice(i, 1);
          setContent(findLink.join(" "));
          // on supprime la photo du post si il y en a une
          setImageUrl("");
        }
      }
    };

    handleVideo();
  }, [userData, content, video]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userData.pictureUrl} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="content"
              id="content"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            {content || imageUrl || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.pictureUrl} alt="user-pic" />
                </div>
                <div className="card-right overflow">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.username}</h3>
                    </div>
                    <span>{timestamParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{content}</p>
                    <img src={imageUrl} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
                        allowFullScreen
                        title={video}></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icons">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer vidéo</button>
                )}
              </div>
              {!isEmpty(error.format) && (
                <p className="error">{error.format}</p>
              )}
              {!isEmpty(error.maxSize) && (
                <p className="error">{error.maxSize}</p>
              )}
              {!isEmpty(error.errorContent) && (
                <p className="error">{error.errorContent}</p>
              )}
              <div className="btn-send">
                {content || imageUrl || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// export
export default NewPostForm;
