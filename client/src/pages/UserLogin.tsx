import GoogleLogIn from "../components/user/googleLogIn/GoogleLogIn";
// import LoginForm from "../components/user/logIn/LogInForm";

import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Theme } from '@mui/material/styles';
import LoginForm from '../components/user/logIn/LogInForm';

import "../App.css"
import RegisterForm from "../components/user/register/RegisterForm";

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

export default function UserLogin() {

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  //
  return (
    <div className="login-page">

{/* <Box sx={{ height: "100%" }}>
      <Box sx={{ width: `calc(500px + 16px)` }}>
        <Slide direction="right" in={checked} mountOnEnter unmountOnExit >
        <div className="login-form-wrapper">
      <LoginForm />
      <button onClick={handleChange}>Login</button>
      </div>
        </Slide>
        <Slide direction="right" in={!checked} mountOnEnter unmountOnExit timeout={{enter: 800}} >
        <div className="login-form-wrapper">
      <RegisterForm/>
      <button onClick={handleChange}>Register</button>
      </div>
        </Slide>
      </Box>
    </Box> */}

      <div className="login-form-wrapper">
      <LoginForm />
      {/* <RegisterForm/> */}
      {/* <GoogleLogIn /> */}
      </div>
    </div>
  );
}
