import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

export default function GoogleLogIn() {
  type User = {
    firstName: string;
    lastName: string;
    email: string;
  };
  const [userData, setUserData] = useState<User>();
  console.log(userData);
  return (
    <div>
      <h3>GoogleLogIn</h3>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          const url = "http://localhost:8000/users/googleLogin";
          //send credential to backend
          const credential = credentialResponse.credential;
          let res = await axios.post(url, { id_token: credential });
          setUserData(res.data.userData);
          if (res.status === 200) {
            console.log(res, "response from backend");
          } else {
            alert("login false");
          }
        }}
        onError={() => {
          console.log("Login failed");
        }}
      />
      <p>Firstname: {userData?.firstName}</p>
      <p>Lastname: {userData?.lastName}</p>
      <p>Email: {userData?.email}</p>
    </div>
  );
}