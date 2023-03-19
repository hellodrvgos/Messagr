import { useState } from "react";
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import axios from "axios";

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
    "0b414e0f-4fb4-4dc3-bae8-3541406bf83d",
    username.firstName,
    //secret
    username.firstName
  );
  if (isAuth === true) {
    return (
      <div style={{ height: "100vh" }}>
        <MultiChatWindow {...chatProps} style={{ height: "100%" }} />
        <MultiChatSocket {...chatProps} />
      </div>
    );
  }
  return <div>Wait</div>;
};
export default ChatsPage;
