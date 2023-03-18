import React from "react";
import RegisterForm from "../components/user/register/RegisterForm";
import UpdateProfileForm from "../components/user/update/updateForm/UpdateProfileForm";

import Box from '@mui/material/Box';


export default function Update() {
  return (
    <div className="update-page">
        {/* <UpdateProfileForm /> */}
        {/* <RegisterForm/>
        <div>Hello</div> */}

        <Box sx={{ height: "100%" }}>
      {/* <Box sx={{ width: `calc(600px + 16px)` }}> */}
        <div className="update-form-wrapper">
      <UpdateProfileForm />
      </div>
      </Box>
    {/* </Box> */}
    </div>
  )
}
