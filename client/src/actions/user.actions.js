// Import
import axios from "axios";

// Const
export const GET_USER = "GET_USER";
export const GET_ONE_USER = "GET_ONE_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const DELETE_USER = "DELETE_USER";

// Errors
export const GET_USER_ERRORS = "GET_USER_ERRORS";

// getUser
export const getUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// getOneUser
export const getOneUser = (userId) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_ONE_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// uploadPicture
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/upload`,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
            withCredentials: true,
          }).then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.pictureUrl });
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

// updateBio
export const updateBio = (id, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + id,
      data: { bio },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: UPDATE_BIO, payload: bio });
          dispatch({ type: GET_USER_ERRORS, payload: "" });
        }
      })
      .catch((err) => console.log(err));
  };
};
