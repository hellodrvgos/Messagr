import GoogleLogIn from "../components/user/googleLogIn/GoogleLogIn";
import LogInForm from "../components/user/logIn/LogInForm";

export default function UserLogin(){
return (
    
    <div className="login-page">
      
      {/* Login with Password Component */}
      <LogInForm/>
      <GoogleLogIn />
    </div>
  );
}
