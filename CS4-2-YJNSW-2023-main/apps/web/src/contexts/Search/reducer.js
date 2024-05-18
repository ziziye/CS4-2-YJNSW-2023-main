import { createReducer } from "../reducerUtils";

export const initialState = {
  searchTerm: "",
  page: 1,
  selectedStreamFilters: [],
  selectedIdentifiedFilter: "All",
  results: {},
  lastSearchTimestamp: null,
};

function clickSearchButton(state, action) {
  return {
    ...state,
    searchTerm: action.payload,
    lastSearchTimestamp: Date.now(),
  };
}

function clickApplyFiltersButton(state) {
  return {
    ...state,
    page: 1,
    lastSearchTimestamp: Date.now(),
  };
}

function clickClearFiltersButton(state) {
  return {
    ...state,
    selectedStreamFilters: [],
    selectedIdentifiedFilter: "All",
    lastSearchTimestamp: Date.now(),
  };
}

function clickStreamFilter(state, action) {
  const selectedStreams = action.payload.isSelected
    ? [...state.selectedStreamFilters, action.payload.stream]
    : [...state.selectedStreamFilters].filter((s) => s !== action.payload.stream);

  return {
    ...state,
    selectedStreamFilters: selectedStreams,
  };
}

function changeIdentifiedFilter(state, action) {
  return {
    ...state,
    selectedIdentifiedFilter: action.payload,
  };
}

function searchViaUrl(state, action) {
  return {
    ...state,
    ...action.payload,
    lastSearchTimestamp: Date.now(),
  };
}

function returnSearchResults(state, action) {
  return {
    ...state,
    results: action.payload,
  };
}

export const reducer = createReducer(initialState, {
  CLICK_SEARCH_BUTTON: clickSearchButton,
  CLICK_APPLY_FILTERS_BUTTON: clickApplyFiltersButton,
  CLICK_CLEAR_FILTERS_BUTTON: clickClearFiltersButton,
  CLICK_STREAM_FILTER: clickStreamFilter,
  CHANGE_IDENTIFIED_FILTER: changeIdentifiedFilter,
  SEARCH_VIA_URL: searchViaUrl,
  RETURN_SEARCH_RESULTS: returnSearchResults,
});
