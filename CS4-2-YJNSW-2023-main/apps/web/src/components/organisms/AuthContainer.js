import { useCallback, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/Auth";
import idp from "../../api-clients/idp";
import { useLocation, useNavigate } from "react-router-dom";

function AuthContainer() {
  const [state, dispatch] = useContext(AuthContext);
  const firstUpdate = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();

  const attemptLogin = useCallback(async () => {
    let res = await idp.login(state.username, state.password);

    localStorage.setItem("isAuthenticated", res.success);
    localStorage.setItem("strapiToken", res.strapiToken);
    localStorage.setItem("roleId", res.idToken.roleId);

    if (res.success) {
      dispatch({ type: "SUCCESSFUL_LOGIN", payload: res });
    } else {
      dispatch({ type: "UNSUCCESSFUL_LOGIN", payload: res });
    }

    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  }, [state.loginAttemptCount]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      attemptLogin();
    }
  }, [attemptLogin]);

  return null;
}

export default AuthContainer;
