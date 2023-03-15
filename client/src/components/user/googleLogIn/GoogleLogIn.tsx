import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { userActions } from "../../../redux/slice/userSlice";
import "./GoogleLogIn.css";
import UserProfile from "../userProfile/UserProfile";
export default function GoogleLogIn() {
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
            const data = response.data.userData;
            dispatch(userActions.getUserDetail(data));
            console.log(response.data.userData, "response from backend");
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
