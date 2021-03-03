import "@testing-library/jest-dom/extend-expect";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import App from "../App";
import store from "../store";

beforeAll(() => jest.spyOn(window, "fetch"));

test("render the app", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText(/recently searched/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { type: "submit" })).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByTestId("results-ul").children.length).toBe(0);
});

test("search query is being added to our UL", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      hits: [
        {
          created_at_i: 23,
          points: 900,
          author: "RTSlabs",
          url: "https://rtslabs.com/",
          title: "test title",
        },
      ],
    }),
  });

  const searchInput = screen.getByRole("textbox");
  const submit = screen.getByTestId("submit-button");

  expect(screen.getByText(/empty/i)).toBeInTheDocument();
  userEvent.type(searchInput, "react");

  expect(searchInput).toHaveValue("react");

  userEvent.click(submit);
  //input and submit should be disabled
  expect(searchInput).toHaveAttribute("disabled");
  expect(submit).toHaveAttribute("disabled");
  //wait for loading text to be removed
  await waitForElementToBeRemoved(() => screen.getByText(/searching.../i));
  //query should be added to our search history and our empty placeholder removed
  expect(screen.queryByText(/empty/i)).not.toBeInTheDocument();
  //results should be rendered
  expect(screen.getByTestId("results-ul").children.length).toBe(1);
  //search input and submit button should no longer be disabled
  expect(searchInput).not.toHaveAttribute("disabled");
  expect(submit).not.toHaveAttribute("disabled");
  //remove query from our search history
  userEvent.click(screen.getByLabelText("remove-search"));
  //empty placeholder should be in the document now that we have no history
  expect(screen.getByText(/empty/i)).toBeInTheDocument();
});
