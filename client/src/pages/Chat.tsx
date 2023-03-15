import AuthPage from "../../src/components/chat/AuthPage";
import ChatsPage from "../../src/components/chat/ChatsPage"

// import "./Chat.css"

import { useState } from "react";

type User = {
    username: string,
    secret: string
}

export default function Chat() {
    const [user, setUser] = useState<User>();

    if (!user) {
      return <AuthPage onAuth={(user: User) => setUser(user)} />;
    } else {
      return <ChatsPage user={user} />;
    }
}