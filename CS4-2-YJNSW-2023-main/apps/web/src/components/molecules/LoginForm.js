import { Button, FormGroupText } from "nsw-ds-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";

function LoginForm() {
  const [state, dispatch] = useContext(AuthContext);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickLoginButton = (e) => {
    e.preventDefault();
    dispatch({ type: "CLICK_LOGIN_BUTTON", payload: { username, password } });
  };

  const passwordStatus = state.isLastAttemptFailure ? "invalid" : undefined;
  const passwordStatusText = state.isLastAttemptFailure
    ? "Incorrect username or password"
    : undefined;

  return (
    <div className="nsw-section nsw-p-x-xxl nsw-m-x-xxl">
      <h1>Login</h1>
      <form className="nsw-form" onSubmit={handleClickLoginButton}>
        <FormGroupText
          htmlId="username"
          label="Username"
          inputType="text"
          onChange={handleUsernameChange}
        />
        <FormGroupText
          htmlId="password"
          label="Password"
          inputType="password"
          status={passwordStatus}
          statusText={passwordStatusText}
          onChange={handlePasswordChange}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default LoginForm;
