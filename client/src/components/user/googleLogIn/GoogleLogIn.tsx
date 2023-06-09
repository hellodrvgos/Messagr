import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { userInfoActions } from "../../../redux/slice/userInformation";
import "./GoogleLogIn.css";

export default function GoogleLogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="google-login">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse, "credential");
          const url = "http://localhost:8002/users/google-login";
          const credential = credentialResponse.credential;
          let response = await axios.post(url, { id_token: credential });
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.userData._id);
            dispatch(userInfoActions.getLogInInfo(true));
            navigate("/chat");
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
