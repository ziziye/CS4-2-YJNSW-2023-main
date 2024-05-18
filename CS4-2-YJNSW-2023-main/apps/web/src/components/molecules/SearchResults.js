import ResultsBar from "./ResultsBar";
import ResultsList from "./ResultsList";
import ResultsPagination from "./ResultsPagination";
import { useContext } from "react";
import { SearchContext } from "../../contexts/Search";
import NoResults from "./NoResults";

function SearchResults() {
  const state = useContext(SearchContext)[0];

  const content = hasResults(state.results.data)
    ? getResultsComponents()
    : getNoResultsComponents();

  return state.lastSearchTimestamp ? content : null;
}

function hasResults(data) {
  return data && data.length > 0;
}

function getResultsComponents() {
  return (
    <>
      <ResultsBar />
      <ResultsList />
      <ResultsPagination />
    </>
  );
}

function getNoResultsComponents() {
  return <NoResults />;
}

export default SearchResults;
