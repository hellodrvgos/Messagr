import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/store";

export default function UserProfile() {
  const userInfo = useSelector((state: RootState) => state.users.userDetail);
  const userId = userInfo._id;
  console.log(userId, "userId");
  return (
    <div>
      {userInfo.isAdmin ? <Link to="/userlist">userlist</Link> : null}
      <p>{userInfo.firstName}</p>
      <p>{userInfo.lastName}</p>
    </div>
  );
}
