import { createReducer } from "../reducerUtils";

export const initialState = {
  filter: "ALL",
};

function ChangedFilter(state, action) {
  return {
    ...state,
    filter: action.payload,
  };
}

export const reducer = createReducer(initialState, {
  CHANGED_FILTER: ChangedFilter,
});
