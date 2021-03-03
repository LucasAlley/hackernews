import { NEW_QUERY, REMOVE_QUERY } from "../types";

export function addToHistory(query) {
  //incase the query is an empty string, don't add it to the history
  if (query !== "") {
    return {
      type: NEW_QUERY,
      payload: { query },
    };
  }
}
export function removeFromHistory(id) {
  return { type: REMOVE_QUERY, payload: { id } };
}
