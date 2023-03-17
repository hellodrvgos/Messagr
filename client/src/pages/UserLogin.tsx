import GoogleLogIn from "../components/user/googleLogIn/GoogleLogIn";
import LoginForm from "../components/user/logIn/LogInForm";

import "../App.css"

export default function UserLogin() {
  return (
    <div className="login-page">
      <div className="login-form-wrapper">
      <LoginForm />
      {/* <GoogleLogIn /> */}
      </div>
    </div>
  );
}
