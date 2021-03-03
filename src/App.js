import { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import RecentlySearched from "./components/RecentlySearched/RecentlySearched";
import Results from "./components/Results/Results";
import Search from "./components/Search/Search";
import store from "./store";

function App() {
  const [results, setResults] = useState([]);

  return (
    <Provider store={store}>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-9/12 mx-auto pt-12">
        <RecentlySearched />
        <div className="w-full flex flex-col space-y-6">
          <Search setResults={setResults} />
          <Results results={results} />
        </div>
      </div>
    </Provider>
  );
}

export default App;
