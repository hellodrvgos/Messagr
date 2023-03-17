import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from 'react-chat-engine-advanced';

import { PrettyChatWindow } from "react-chat-engine-pretty"

import axios from "axios";
import { useState } from 'react';

type User = {
  firstName: string,
}

const ChatsPage = (username: User) => {

  const [isAuth, setIsAuth] = useState<boolean>(false);

  axios.post(
    "http://localhost:8002/users/loginChat",
    {username: username.firstName}
  )
  // .then(r => ({ ...r.data, secret: username.firstName}))
  .then(r => {
    if (r.data.is_authenticated === true) {
      setIsAuth(r.data.is_authenticated);
    }
  })
  .catch(e => console.log(e, "error"));

  const chatProps = useMultiChatLogic(
    '0b414e0f-4fb4-4dc3-bae8-3541406bf83d',
    username.firstName,
    //secret
    username.firstName
  );
  if (isAuth === true) {
    return <div style={{height: "100vh"}}>
      <MultiChatWindow {...chatProps} style={{height: "100%"}}/>
      <MultiChatSocket {...chatProps} />
    </div>;
  } return  <div>Wait</div>

// return <div style={{height: "100vh"}}>
//   <PrettyChatWindow 
//   projectId='0b414e0f-4fb4-4dc3-bae8-3541406bf83d'
//   username={user.username}
//   secret={user.secret}
//   style={{height: "100%"}}
// />
// <MultiChatSocket {...chatProps} />
// </div>

  };
  export default ChatsPage;