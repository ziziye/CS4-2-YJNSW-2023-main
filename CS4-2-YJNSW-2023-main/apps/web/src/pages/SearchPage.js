import React from "react";
import LeftSidebarTemplate from "../components/templates/LeftSidebarTemplate";
import ResultFilters from "../components/organisms/ResultFilters";
import SearchResults from "../components/molecules/SearchResults";
import SearchPanel from "../components/organisms/SearchPanel";
import SearchContainer from "../components/organisms/SearchContainer";
import { SearchProvider } from "../contexts/Search";

function SearchPage() {
  sessionStorage.clear("SelectedGoals");
  return (
    <SearchProvider>
      <SearchContainer />
      <LeftSidebarTemplate
        topContent={<SearchPanel />}
        sidebarContent={<ResultFilters />}
        mainContent={<SearchResults />}
      />
    </SearchProvider>
  );
}

export default SearchPage;
