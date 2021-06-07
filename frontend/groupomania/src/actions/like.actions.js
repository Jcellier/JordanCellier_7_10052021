// Import
import axios from "axios";

// const
export const GET_LIKES = "GET_LIKES";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const getLikes = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/read-like-post`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_LIKES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (post, uid) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.id}/like-post/${uid}`,
      withCredentials: true,
    });
  };
};

export const unlikePost = (post, uid) => {
  let postId = post.id;
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.id}/unlike-post/${uid}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, uid } });
      })
      .catch((err) => console.log(err));
  };
};
