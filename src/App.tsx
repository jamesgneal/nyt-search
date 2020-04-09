import React, { useState } from "react";
import { searchNYT } from "./utils/api";
import { Articles, NYTArticleData } from "./Components/Articles";
import { Form } from "./Components/Form";
import "./App.css";

function App() {
  const [keywordsToSearch, setKeywordsToSearch] = useState("");
  const [sectionToSearch, setSectionToSearch] = useState("Home");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<
    NYTArticleData[] | undefined
  >(undefined);
  const [searchCount, setSearchCount] = useState<number>();
  const [lastKeywordsSearched, setLastKeywordsSearched] = useState("");
  const [lastSectionSearched, setLastSectionSearched] = useState("");

  const searchAndStoreResults = async () => {
    setIsSearching(true);
    const results = await searchNYT(keywordsToSearch, sectionToSearch);
    setSearchResults(results?.data);
    setSearchCount(results?.hits);
    setIsSearching(false);
  };

  const handleSubmit = async () => {
    if (isSearching === false && keywordsToSearch.length > 0) {
      const lowerCaseSearchTerms = keywordsToSearch.toLowerCase();
      await searchAndStoreResults();
      setLastKeywordsSearched(lowerCaseSearchTerms);
      setLastSectionSearched(sectionToSearch);
    }
  };

  const ResultsTitle = () => {
    if (isSearching)
      return `Searching for "${keywordsToSearch}" in the "${sectionToSearch}" section...`;
    else if (lastKeywordsSearched && searchResults)
      return `Showing ${searchResults.length} articles of ${searchCount} found for "${lastKeywordsSearched}" in the "${lastSectionSearched}" section`;
  };

  return (
    <div className="App">
      <header>
        <h1>New York Times Article Searcher</h1>
        <Form
          handleSubmit={handleSubmit}
          inputValue={keywordsToSearch}
          isSearching={isSearching}
          selectValue={sectionToSearch}
          setKeywords={setKeywordsToSearch}
          setSection={setSectionToSearch}
        />
      </header>
      <h2>{ResultsTitle()}</h2>
      <Articles content={searchResults} />
    </div>
  );
}

export default App;
