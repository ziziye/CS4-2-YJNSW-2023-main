import LoginForm from "../components/molecules/LoginForm";
import LoginTemplate from "../components/templates/LoginTemplate";

function Login() {
  return <LoginTemplate content={<LoginForm />} />;
}

export default Login;
