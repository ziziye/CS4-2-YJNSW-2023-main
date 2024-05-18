import React, { useReducer } from "react";
import { initialState, reducer } from "./reducer";

export const GoalContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const GoalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GoalContext.Provider value={[state, dispatch]}>{children}</GoalContext.Provider>;
};
