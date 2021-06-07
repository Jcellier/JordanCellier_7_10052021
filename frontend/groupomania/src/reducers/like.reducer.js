// imports
import { GET_LIKES, UNLIKE_POST } from "../actions/like.actions";

// const
const initialState = {};

export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKES:
      return action.payload;

    case UNLIKE_POST:
      return state.filter(
        (like) =>
          like.userId !== action.payload.uid &&
          like.postId !== action.payload.postId
      );

    default:
      return state;
  }
}
