// Imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import CardTrendComment from "./CardTrendComment";

const CardTrend = ({ post }) => {
  // useState
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  // store
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  // dispatch
  const dispatch = useDispatch();

  // fonction qui permet de modifier un commentaire
  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
    }
    setIsUpdated(false);
  };

  // fonction qui permet de supprimer un commentaire
  const deleteQuote = async () => {
    await dispatch(deletePost(post.id));
  };

  return (
    <div className="card-container">
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
      <div className="card-right">
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
                  window.confirm("Voulez-vous vraiment supprimer ce message ?")
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

            <span>{post.comments}</span>
          </div>
        </div>

        {showComments && <CardTrendComment post={post} />}
      </div>
    </div>
  );
};

export default CardTrend;
