// Import
import axios from "axios";

// const
export const GET_POSTS = "GET_POSTS";
export const GET_ONE_POST = "GET_ONE_POST";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      withCredentials: true,
    })
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getOnePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/read-one-post/${postId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_ONE_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  console.log(data);
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      data: data,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      if (res.data.errors) {
        dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
      } else {
        dispatch({ type: GET_POST_ERRORS, payload: "" });
      }
    });
  };
};

export const updatePost = (postId, content) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { content },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
          window.alert(res.data.errors.errorUpdateContent);
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
          dispatch({ type: UPDATE_POST, payload: { content, postId } });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};
