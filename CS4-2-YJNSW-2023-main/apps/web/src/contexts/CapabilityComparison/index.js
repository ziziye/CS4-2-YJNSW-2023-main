import React, { useReducer } from "react";
import { initialState, reducer } from "./reducer";

export const CapabilityComparisonContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const CapabilityComparisonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CapabilityComparisonContext.Provider value={[state, dispatch]}>
      {children}
    </CapabilityComparisonContext.Provider>
  );
};
