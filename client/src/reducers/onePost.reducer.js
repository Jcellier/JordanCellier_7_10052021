// Imports
import { GET_ONE_POST } from "../actions/post.actions";

// Const
const initialState = {};

export default function onePostReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ONE_POST:
      return action.payload;

    default:
      return state;
  }
}
