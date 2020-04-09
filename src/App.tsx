import React, { useState } from "react";
import { Row } from "react-materialize";
import { searchNYT } from "./utils/api";
import { Form } from "./Components/Form";
import { Header } from "./Components/Header";
import { Articles, NYTArticleData } from "./Components/Articles";

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
      <Header />
      <Form
        handleSubmit={handleSubmit}
        inputValue={keywordsToSearch}
        isSearching={isSearching}
        sectionValue={sectionToSearch}
        setKeywords={setKeywordsToSearch}
        setSection={setSectionToSearch}
      />

      <Row>
        <h4>{ResultsTitle()}</h4>
      </Row>
      <Articles content={searchResults} />
    </div>
  );
}

export default App;
