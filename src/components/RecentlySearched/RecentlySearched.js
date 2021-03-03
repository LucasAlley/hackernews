import React from "react";
import { connect } from "react-redux";
import { removeFromHistory } from "../../actions";

function RecentlySearched({ history, removeFromHistory }) {
  return (
    <div>
      <h2 className="font-medium text-gray-700">Recently Searched</h2>
      <ul
        data-testid="recent-ul"
        className="rounded shadow-md w-64 bg-white flex flex-col space-y-3 max-h-96 overflow-auto px-2 py-2"
      >
        {!history.length ? (
          <p className="text-gray-500 text-sm">Empty</p>
        ) : null}
        {history.map((e) => (
          <li key={e.id} className="flex items-center justify-between">
            <p className="text-gray-500 font-medium">{e.query}</p>
            <div className="space-x-2">
              <button
                type="button"
                aria-label="remove-search"
                onClick={() => removeFromHistory(e.id)}
                className="bg-red-400 text-white px-2 py-2 rounded-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  history: state.recentSearches.history,
});

export default connect(mapStateToProps, { removeFromHistory })(
  RecentlySearched
);
