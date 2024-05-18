import React, { useReducer } from "react";
import { initialState, reducer } from "./reducer";

export const AuthContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
};
