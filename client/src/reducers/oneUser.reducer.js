// Imports
import { GET_ONE_USER } from "../actions/user.actions";

// Const
const initialState = {};

export default function oneUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ONE_USER:
      return action.payload;

    default:
      return state;
  }
}
