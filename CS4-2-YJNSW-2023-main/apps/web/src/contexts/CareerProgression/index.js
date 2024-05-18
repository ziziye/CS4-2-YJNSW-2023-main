import React, { useReducer } from "react";
import { initialState, reducer } from "./reducer";

export const CareerProgressionContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const CareerProgressionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CareerProgressionContext.Provider value={[state, dispatch]}>
      {children}
    </CareerProgressionContext.Provider>
  );
};
