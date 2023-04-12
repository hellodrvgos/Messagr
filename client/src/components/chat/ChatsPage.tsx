import { useState } from "react";
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import axios from "axios";
import Box from "@mui/material/Box";

import "../../App.css"
import { Typography } from "@mui/material";

type User = {
  firstName: string;
};

const ChatsPage = (username: User) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  axios
    .post("http://localhost:8002/users/loginChat", {
      username: username.firstName,
    })
    .then((r) => {
      if (r.data.is_authenticated === true) {
        setIsAuth(r.data.is_authenticated);
      }
    })
    .catch((e) => console.log(e, "error"));

  const chatProps = useMultiChatLogic(
    //project id
    "59f46d8d-3871-4a05-a785-de39bea1afef",
    username.firstName,
    //secret
    username.firstName
  );
  if (isAuth === true) {
    return (
      <div className="chat-page">
        <Box sx={{height: "100vh", width: "70%", margin: "0 auto", p: 2}}>
        <Box sx={{height: "100%", bgcolor: "white", width: "95%", margin: "0 auto", borderRadius: "20px", p: 1,   boxShadow: "0px 0px 30px #5521b595"}}>

        <MultiChatWindow {...chatProps} />
        <MultiChatSocket {...chatProps} />
        </Box>
        </Box>

      </div>
    );
  }
  return <div style={{height: "100vh"}}><Typography variant="h5" sx={{color: "white"}}>Loading...</Typography></div>;
};
export default ChatsPage;
