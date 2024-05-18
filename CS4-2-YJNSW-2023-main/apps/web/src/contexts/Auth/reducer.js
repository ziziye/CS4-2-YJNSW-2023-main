import { createReducer } from "../reducerUtils";

export const initialState = {
  username: null,
  password: null,
  isLastAttemptFailure: false,
  loginAttemptCount: 0,
};

function clickLoginButton(state, action) {
  return {
    ...state,
    username: action.payload.username,
    password: action.payload.password,
    loginAttemptCount: ++state.loginAttemptCount,
  };
}

function successfulLogin(state) {
  return {
    ...state,
    isLastAttemptFailure: false,
  };
}

function unsuccessfulLogin(state) {
  return {
    ...state,
    isLastAttemptFailure: true,
  };
}

export const reducer = createReducer(initialState, {
  CLICK_LOGIN_BUTTON: clickLoginButton,
  SUCCESSFUL_LOGIN: successfulLogin,
  UNSUCCESSFUL_LOGIN: unsuccessfulLogin,
});
