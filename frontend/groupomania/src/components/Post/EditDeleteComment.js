// Imports
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../actions/comment.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ comment, post }) => {
  // useState
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState("");
  // id utilisateur connecté
  const uid = useContext(UidContext);
  // store
  const userData = useSelector((state) => state.userReducer);
  // dispatch
  const dispatch = useDispatch();

  // let
  let commentId = comment.id;
  let postId = post.id;
  let userAdmin = userData.isAdmin;

  // fonction qui permet de modifier un commentaire
  const handleEdit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    // on dispatch updateComment, on passe l'id du commentaire et le nouveau commentaire
    if (content) dispatch(updateComment(commentId, content));
    setIsLoading(false);
  };

  // fonction qui permet de supprimer un commentaire
  const handleDelete = () => {
    setIsLoading(true);
    // on dispatch deleteComent, on passe l'id du commentaire, et l'id du post pour le store
    dispatch(deleteComment(commentId, postId));
    setIsLoading(false);
  };

  // useEffect qui check l'id de l'utilisateur en ligne et l'userId des commentaires
  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.userId) {
        setIsAuthor(true);
      } else setIsAuthor(false);
    };
    checkAuthor();
  }, [uid, comment.userId]);

  return (
    <>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <div className="edit-comment">
          {isAuthor && edit === false && (
            <span onClick={() => setEdit(!edit)}>
              <img src="./img/icons/edit.svg" alt="edit-comment" />
            </span>
          )}
          {isAuthor && edit && (
            <form action="" onSubmit={handleEdit} className="edit-comment-form">
              <label htmlFor="text" onClick={() => setEdit(!edit)}>
                Editer
              </label>
              <br />
              <input
                type="text"
                name="content"
                onChange={(e) => setContent(e.target.value)}
                defaultValue={comment.content}
              />
              <br />
              <div className="btn">
                <span
                  onClick={() => {
                    if (
                      window.confirm("Voulez-vous supprimer ce commentaire ?")
                    ) {
                      handleDelete();
                    }
                  }}>
                  <img src="./img/icons/trash.svg" alt="delete" />
                </span>
                <input type="submit" value="Valider" />
              </div>
            </form>
          )}
          {userAdmin === true && (
            <div className="btn">
              <span
                onClick={() => {
                  if (
                    window.confirm("Voulez-vous supprimer ce commentaire ?")
                  ) {
                    handleDelete();
                  }
                }}>
                <img src="./img/icons/trash.svg" alt="delete" />
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

// export
export default EditDeleteComment;
