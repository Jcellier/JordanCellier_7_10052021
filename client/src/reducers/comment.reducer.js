// Imports
import {
  DELETE_COMMENT,
  GET_COMMENTS,
  UPDATE_COMMENT,
} from "../actions/comment.actions";

// const
const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;
    case UPDATE_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            content: action.payload.content,
          };
        } else return comment;
      });

    case DELETE_COMMENT: {
      return state.filter((comment) => comment.id !== action.payload.commentId);
    }

    default:
      return state;
  }
}
