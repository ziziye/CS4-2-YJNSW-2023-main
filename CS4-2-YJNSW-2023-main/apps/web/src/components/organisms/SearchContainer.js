import { useCallback, useContext, useEffect, useRef } from "react";
import { SearchContext } from "../../contexts/Search";
import cms from "../../api-clients/cms";
import { useSearchParams } from "react-router-dom";
import { initialState } from "../../contexts/Search/reducer";

function SearchContainer() {
  const [state, dispatch] = useContext(SearchContext);
  const firstUpdate = useRef(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const performSearch = useCallback(async () => {
    let res = await cms.getRoles({
      searchTerm: state.searchTerm,
      page: state.page,
      streamFilters: state.selectedStreamFilters,
      identifiedFilter: state.selectedIdentifiedFilter,
    });

    setSearchParams({
      q: state.searchTerm,
      page: state.page,
      stream: state.selectedStreamFilters,
      identified: state.selectedIdentifiedFilter || initialState.selectedIdentifiedFilter,
    });

    dispatch({ type: "RETURN_SEARCH_RESULTS", payload: res });
  }, [state.lastSearchTimestamp]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      if (!isSearchTriggeredByUrl()) {
        dispatch({
          type: "SEARCH_VIA_URL",
          payload: {
            searchTerm: searchParams.get("q"),
            page: searchParams.get("page"),
            selectedStreamFilters: searchParams.getAll("stream"),
            selectedIdentifiedFilter: searchParams.get("identified") || undefined,
          },
        });
      }
    } else {
      performSearch();
    }
  }, [performSearch]);

  function isSearchTriggeredByUrl() {
    return searchParams.get("q") === null;
  }

  return null;
}

export default SearchContainer;
