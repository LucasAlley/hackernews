import React from "react";

export default function Results({ results }) {
  return (
    <ul data-testid="results-ul" className="max-h-96 overflow-auto space-y-4">
      {results.map((result) => (
        <li
          className="bg-white rounded-md shadow px-4 flex items-center py-2 space-x-4"
          key={result.created_at_i}
        >
          <span className="text-yellow-500 font-medium flex items-center rounded px-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
            <p>{result.points}</p>
          </span>
          <p className="text-gray-700 font-medium">{result.author}</p>
          <a
            className="text-blue-500 underline"
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {result.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
