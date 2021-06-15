// Imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments } from "../../actions/comment.actions";
import { isEmpty, timestamParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

const CardTrendComment = ({ post }) => {
  // useState
  const [content, setText] = useState("");
  // store
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const commentData = useSelector((state) => state.commentReducer);
  const error = useSelector((state) => state.errorReducer.postErrors);
  // dispatch
  const dispatch = useDispatch();

  // fonction qui permet de créer un commentaire
  const handleComment = async (e) => {
    e.preventDefault();

    // on contrôle que l'utilisateur a bien rempli le champ
    if (content) {
      // on dispatch addComment, on passe le post, l'utilisateur et le commentaire
      await dispatch(addComment(post, userData, content));
      // on dispatch getComments pour récupérer l'id du commentaire
      dispatch(getComments());
      // on vide le champ
      setText("");
      // si le champ n'est pas rempli on envoie une alerte
    } else {
      alert("Veuillez entrer un message");
    }
  };

  return (
    <div className="comments-container">
      {!isEmpty(commentData[0]) &&
        commentData.map((comment) => {
          if (comment.postId === post.id) {
            return (
              <div
                className={
                  comment.userId === userData.id
                    ? "comment-container client"
                    : "comment-container"
                }
                key={comment.id}>
                <div className="letf-part">
                  <img
                    src={
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user.id === comment.userId)
                            return user.pictureUrl;
                          else return null;
                        })
                        .join("")
                    }
                    alt="commenter-pic"
                  />
                </div>

                <div className="right-part">
                  <div className="comment-header">
                    <div className="pseudo">
                      <h3>{comment.commenterId}</h3>
                    </div>
                    <span>{timestamParser(comment.updatedAt)}</span>
                  </div>

                  <p>{comment.content}</p>
                </div>
                <span></span>
                <EditDeleteComment comment={comment} post={post} />
              </div>
            );
          }
          return null;
        })}
      {userData.id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            id="content"
            name="content"
            onChange={(e) => setText(e.target.value)}
            value={content}
            placeholder="Laisser un commentaire"
          />
          <br />
          {!isEmpty(error.errorContentComment) && (
            <p className="error">{error.errorContentComment}</p>
          )}
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

// Export
export default CardTrendComment;
