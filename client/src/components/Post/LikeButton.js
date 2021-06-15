// Imports
import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { isEmpty } from "../Utils";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, likePost, unlikePost } from "../../actions/like.actions";
import { getPosts } from "../../actions/post.actions";

const LikeButton = ({ post, postUsersLike }) => {
  // useState
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // id utilisateur connecté
  const uid = useContext(UidContext);
  // dispatch
  const dispatch = useDispatch();
  // store
  const likeData = useSelector((state) => state.likeReducer);

  // let
  let likeId =
    !isEmpty(likeData[0]) &&
    likeData.map((likesId) => {
      return likesId.id;
    });

  // const
  const getLikesPosts = () => {
    dispatch(getLikes());
    dispatch(getPosts());
  };

  // fonction qui permet de liker un post
  const like = async () => {
    // load spinner true
    setIsLoading(true);
    // on dispatch likePost, on passe le post et l'id de l'utilisateur
    await dispatch(likePost(post, uid));
    // On récupère l'id du like et la relation dans le post
    getLikesPosts();
    // on passe le like a true
    setLiked(true);
    // load spinner false
    setIsLoading(false);
  };

  // fonction qui permet de unliker un post
  const unlike = async () => {
    // load spinner true
    setIsLoading(true);
    // on dispatch unlikePost, on passe le post, l'id de l'utilisateur et l'id du like
    await dispatch(unlikePost(post, uid, likeId));
    // on passe le like a false
    setLiked(false);
    // load spinner false
    setIsLoading(false);
  };

  // useEffect, affiche les likes 'liked' pour l'utilisateur connecté
  useEffect(() => {
    // on cherche dans le post si l'id de l'utilisateur y est
    if (!isEmpty(postUsersLike[0]) && postUsersLike.includes(uid)) {
      setLiked(true);
    } else setLiked(false);
  }, [uid, postUsersLike, liked]);

  return (
    <>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <div className="like-container">
          {uid === null && (
            <Popup
              trigger={<img src="./img/icons/heart.svg" alt="like" />}
              position={["bottom center", "bottom right", "bottom left"]}
              closeOnDocumentClick>
              <div>Connectez-vous pour aimer un post !</div>
            </Popup>
          )}

          {uid && liked === false && (
            <img
              src="./img/icons/heart.svg"
              onClick={like}
              alt="like"
              key={likeId}
            />
          )}

          {uid && liked && (
            <img
              src="./img/icons/heart-filled.svg"
              onClick={unlike}
              alt="unlike"
              key={likeId}
            />
          )}

          <span>{post.Users.length}</span>
        </div>
      )}
    </>
  );
};

// Export
export default LikeButton;
