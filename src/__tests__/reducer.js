import recentSearches from "../reducers/recentSearches";
import { NEW_QUERY, REMOVE_QUERY } from "../types";

describe("recent searches reducer", () => {
  const query = "Dan Abramov";

  test("should return initial state ", () => {
    expect(recentSearches(undefined, {})).toEqual({
      history: [],
    });
  });

  test("should handle NEW_QUERY by adding to our history array", () => {
    const state = { history: [] };

    expect(
      recentSearches(state, { type: NEW_QUERY, payload: { query } })
    ).toEqual({
      //our id is a randomized number, to account for this we'll just check that a number is being set
      history: [{ id: expect.any(Number), query }],
    });
  });

  test("should handle REMOVE_QUERY by removing the query from our history array", () => {
    const state = { history: [{ id: 1, query }] };

    expect(
      recentSearches(state, { type: REMOVE_QUERY, payload: { id: 1 } })
    ).toEqual({
      history: [],
    });
  });
});
