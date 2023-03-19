import Box from "@mui/material/Box";

import UpdateProfileForm from "../components/user/update/updateForm/UpdateProfileForm";

import randomAvatar from "../../src/assets/images/avatars/random_avatar.png"

import avatarboy1 from "../../src/assets/images/avatars/boy/avatar_boy2.png";
import { RootState, AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserInformation } from "../redux/thunk/userInformation";

import { useState } from "react";


export default function Update() {

  const userId = localStorage.getItem("id") || "{}";
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch, userId]);

  const userInfoDetails = useSelector(
    (state: RootState) => state.userinformation.userInfo
  );

  const [avatar, setAvatar] = useState(userInfoDetails.avatar);

  useEffect(() => {
    setAvatar(userInfoDetails.avatar);
  }, [userInfoDetails.avatar])

  return (
    <div className="update-page">
      <Box sx={{ height: "100%" }}>
        <div className="update-form-wrapper">
          <UpdateProfileForm avatar={avatar} setAvatar={setAvatar}/>
        </div>
      </Box>
      <Box>
        <img style={{width: "44%", position: "absolute", bottom: 0, right: 10}} src={avatar} />
      </Box>
    </div>
  );
}
