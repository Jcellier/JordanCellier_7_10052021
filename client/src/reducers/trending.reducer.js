// Imports
import { GET_TRENDS } from "../actions/trend.actions";

// Const
const initialState = {};

export default function trendingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDS:
      return action.payload;
    default:
      return state;
  }
}
