import React, { useState } from "react";
import { connect } from "react-redux";
import { addToHistory } from "../../actions/index";
import { useStatus } from "../../hooks/useStatus";
function Search({ setResults, addToHistory }) {
  const [query, setQuery] = useState("");

  const [status, { loading, resolved, error }] = useStatus("IDLE");

  async function handleSubmit(e) {
    e.preventDefault();
    //set status to LOADING, disable input and search button
    loading();
    //add the query to our search history
    addToHistory(query);

    fetch(`http://hn.algolia.com/api/v1/search?query=${encodeURI(query)}`)
      .then((r) => r.json())
      .then((d) => {
        setResults(d.hits);
        //set status to RESOLVED, re-enabling the input and search button
        resolved();
      })
      .catch(() => {
        //set status to FAILED, show our error message
        error();
      });
  }
  return (
    <>
      <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
        <label
          htmlFor="search"
          aria-label="search"
          className="font-medium text-gray-700 block"
        >
          Search
        </label>
        <input
          type="text"
          name="search"
          value={query}
          className="w-96 rounded-md border border-gray-400 py-2 px-2 shadow-md text-gray-700 text-md"
          onChange={(e) => setQuery(e.target.value)}
          disabled={status === "LOADING"}
        />

        <button
          data-testid="submit-button"
          type="submit"
          disabled={status === "LOADING"}
          className="bg-yellow-500 px-2 py-2  text-white shadow rounded inline-block ml-4"
        >
          {status === "LOADING" ? "Searching..." : "Search"}
        </button>
      </form>
      {status === "FAILED"
        ? "There was an error with this request. Try again in a moment"
        : null}
    </>
  );
}

export default connect(null, { addToHistory })(Search);
