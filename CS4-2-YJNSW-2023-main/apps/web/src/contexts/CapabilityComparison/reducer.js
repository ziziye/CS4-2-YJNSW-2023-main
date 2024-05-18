import { createReducer } from "../reducerUtils";

export const initialState = {
  capabilityTotal: [],
};

function returnCapabilityTotal(state, action) {
  return {
    ...state,
    capabilityTotal: action.payload,
  };
}

export const reducer = createReducer(initialState, {
  RETURN_CAPABILITY_TOTAL: returnCapabilityTotal,
});
