import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import "./GoogleLogIn.css";
export default function GoogleLogIn() {
  return (
    <div className="google-login">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse, "credential");
          const url = "http://localhost:8002/users/google-login";
          const credential = credentialResponse.credential;
          let response = await axios.post(url, { id_token: credential });
          if (response.status === 200) {
            console.log(response, "response from backend");
          } else {
            console.log("no response");
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
