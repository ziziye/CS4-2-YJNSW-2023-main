import React, { useReducer } from "react";
import { initialState, reducer } from "./reducer";

export const SearchContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <SearchContext.Provider value={[state, dispatch]}>{children}</SearchContext.Provider>;
};
