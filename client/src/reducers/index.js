// Imports
import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import oneUserReducer from "./oneUser.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import allPostsReducer from "./allPosts.reducer";
import commentReducer from "./comment.reducer";
import likeReducer from "./like.reducer";
import errorReducer from "./error.reducer";
import trendingReducer from "./trending.reducer";
import onePostReducer from "./onePost.reducer";

export default combineReducers({
  userReducer,
  oneUserReducer,
  usersReducer,
  postReducer,
  allPostsReducer,
  commentReducer,
  likeReducer,
  errorReducer,
  trendingReducer,
  onePostReducer,
});
