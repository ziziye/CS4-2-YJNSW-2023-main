import { createReducer } from "../reducerUtils";

export const initialState = {
  discoverRole: true,
  roleId: null,
  searchTerm: "",
  selectedStreamFilters: [],
  selectedIdentifiedFilter: "All",
  results: {},
  lastSearchTimestamp: null,
};

function switchView(state, action) {
  return {
    ...state,
    discoverRole: action.payload,
  };
}

function changeRole(state, action) {
  return {
    ...state,
    roleId: action.payload,
  };
}

function clickSearchButton(state, action) {
  return {
    ...state,
    searchTerm: action.payload,
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
    lastSearchTimestamp: Date.now(),
  };
}

function changeIdentifiedFilter(state, action) {
  return {
    ...state,
    selectedIdentifiedFilter: action.payload,
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
  CLICK_SWITCH_BUTTON: switchView,
  RETURN_ROLE_ID: changeRole,
  CLICK_SEARCH_BUTTON: clickSearchButton,
  CLICK_STREAM_FILTER: clickStreamFilter,
  CHANGE_IDENTIFIED_FILTER: changeIdentifiedFilter,
  RETURN_SEARCH_RESULTS: returnSearchResults,
});
