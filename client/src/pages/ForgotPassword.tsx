import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";

import "../App.css";
import ResetPassword from "../components/user/resetPassword/ResestPassword";

const icon = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme: Theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

export default function ForgotPassword() {
  return (
    <div className="login-page">
      <div className="login-form-wrapper">
        <ResetPassword/>
      </div>
    </div>
  );
}
