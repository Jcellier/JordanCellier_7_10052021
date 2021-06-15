// Const
export const GET_TRENDS = "GET_TRENDS";

// getTrends
export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: sortedArray });
  };
};
