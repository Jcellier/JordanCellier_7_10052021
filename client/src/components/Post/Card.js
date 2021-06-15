// Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import CardComments from "./CardComments";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  // useState
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  // store
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  // dispatch
  const dispatch = useDispatch();

  // fonction qui permet d'actualiser un post
  const updateItem = async () => {
    if (textUpdate) {
      await dispatch(updatePost(post.id, textUpdate));
    }

    setIsUpdated(false);
  };

  // fonction qui permet de supprimer un post
  const deleteQuote = async () => {
    setIsLoading(true);
    await dispatch(deletePost(post.id));
    setIsLoading(false);
  };

  // useEffect qui passe le loading a false si le store usersData n'est pas vide
  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.id === post.UserId) return user.pictureUrl;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right overflow">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user.id === post.UserId) return user.username;
                      else return null;
                    })}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.content}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.imageUrl && (
              <img src={post.imageUrl} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
                allowFullScreen
                title={post.id}></iframe>
            )}
            {userData.id === post.UserId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <div
                  onClick={() => {
                    if (
                      window.confirm(
                        "Voulez-vous vraiment supprimer ce message ?"
                      )
                    ) {
                      deleteQuote();
                    }
                  }}>
                  <img src="./img/icons/trash.svg" alt="trash" />
                </div>
              </div>
            )}
            {userData.isAdmin === true && (
              <div className="button-container">
                <div
                  onClick={() => {
                    if (
                      window.confirm(
                        "Voulez-vous vraiment supprimer ce message ?"
                      )
                    ) {
                      deleteQuote();
                    }
                  }}>
                  <img src="./img/icons/trash.svg" alt="trash" />
                </div>
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comments"
                />
              </div>
              <div>
                <LikeButton
                  post={post}
                  postUsersLike={
                    !isEmpty(post.Users[0]) &&
                    post.Users.map((likersId) => {
                      if (likersId.Like) return likersId.Like.userId;
                      else return null;
                    })
                  }
                />
              </div>
            </div>

            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

// Export
export default Card;
