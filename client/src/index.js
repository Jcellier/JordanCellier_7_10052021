// Imports
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";
import { getComments } from "./actions/comment.actions";
import { getLikes } from "./actions/like.actions";
import { getPosts } from "./actions/post.actions";

// Dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

// Store
store.dispatch(getUsers());
store.dispatch(getPosts());
store.dispatch(getComments());
store.dispatch(getLikes());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
