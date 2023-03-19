import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { RootState, AppDispatch } from "./../redux/store";
import { getUserInformation } from "../redux/thunk/userInformation";
import ChatsPage from "../../src/components/chat/ChatsPage";

export default function Chat() {
  const userId = localStorage.getItem("id") || "{}";

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch, userId]);

  const userInfoDetails = useSelector(
    (state: RootState) => state.userinformation.userInfo
  );

  console.log(userInfoDetails, "userInfoDetails");

  if (userInfoDetails.isBanned === false) {
    return <ChatsPage firstName={userInfoDetails.firstName} />;
  }
  return <div>You are banned!</div>;
}
