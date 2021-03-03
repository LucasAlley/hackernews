import { addToHistory, removeFromHistory } from "../actions";
import { NEW_QUERY, REMOVE_QUERY } from "../types";

test("create action to add query to history state", async () => {
  const query = "Dan Abramov";
  const expectedAction = {
    type: NEW_QUERY,
    payload: { query },
  };
  expect(addToHistory(query)).toEqual(expectedAction);
});

test("no action should be created when query is empty", async () => {
  const query = "";

  expect(addToHistory(query)).toBeUndefined();
});

test("create action to remove query from history state", async () => {
  const id = 1;
  const expectedAction = {
    type: REMOVE_QUERY,
    payload: { id },
  };
  expect(removeFromHistory(1)).toEqual(expectedAction);
});
