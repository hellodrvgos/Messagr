import GoogleLogIn from "../components/user/googleLogIn/GoogleLogIn";
import LoginForm from "../components/user/logIn/LogInForm";

export default function UserLogin() {
  return (
    <div className="login-page">
      <LoginForm/>
      <GoogleLogIn />
    </div>
  );
}
