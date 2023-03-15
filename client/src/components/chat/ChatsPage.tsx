import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from 'react-chat-engine-advanced';

import { PrettyChatWindow } from "react-chat-engine-pretty"

type User = {
  username: string,
  secret: string
}

const ChatsPage = ({user}: {user: User}) => {
  const chatProps = useMultiChatLogic(
    '0b414e0f-4fb4-4dc3-bae8-3541406bf83d',
    user.username,
    user.secret
  );
    return <div style={{height: "100vh"}}>
      <MultiChatWindow {...chatProps} style={{height: "100%"}}/>
      <MultiChatSocket {...chatProps} />
    </div>;
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