import { NEW_QUERY, REMOVE_QUERY } from "../types";

const initialState = {
  history: [],
};

export default function recentSearches(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_QUERY:
      return {
        ...state,
        history: state.history.concat({
          id: Math.random(),
          query: payload.query,
        }),
      };
    case REMOVE_QUERY:
      return {
        ...state,
        history: state.history.filter((item) => item.id !== payload.id),
      };

    default:
      return state;
  }
}
