import ChatsPage from "../../src/components/chat/ChatsPage"

import { RootState, AppDispatch } from "./../redux/store"
import { getUserInformation } from "../redux/thunk/userInformation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

type User = {
    username: string,
    secret: string
}

export default function Chat() {

  const userId = localStorage.getItem("id") || "{}";

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
     dispatch(getUserInformation());
  }, [dispatch, userId]);

  const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

  console.log(userInfoDetails, "userInfoDetails");

    if (userInfoDetails.isBanned === false) {
      return <ChatsPage firstName={userInfoDetails.firstName} />;
    }
    return <div>You are banned!</div>;
}