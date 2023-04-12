import * as React from "react";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import LoginForm from "../components/user/logIn/LogInForm";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";

import "../App.css";
import RegisterForm from "../components/user/register/RegisterForm";

export default function HomePage() {

  const token = localStorage.getItem("token");
  
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  
  if (token !== null) {
    return     <div className="login-page">
    <Box sx={{ height: "100%" }}>
    <Box sx={{ width: `calc(600px + 16px)` , mt: "10%"}}>
    <div className="login-form-wrapper">
    <Typography variant="h4" sx={{ my: 20 }}>
    You are logged in 🤗
    </Typography>
    </div>
    </Box>  
    </Box>
  </div>
  }
  return (
    <div className="login-page">
      <Box sx={{ height: "100%" }}>
        <Box sx={{ width: `calc(600px + 16px)` }}>
          <Slide direction="right" in={!checked} mountOnEnter unmountOnExit>
            <div className="login-form-wrapper">
              <LoginForm />
              <Typography sx={{ mt: 3 }}>
                Don't have an account?{" "}
                <Link
                  onClick={handleChange}
                  variant="body2"
                  sx={{ cursor: "pointer", fontWeight: 800 }}
                >
                  Sign Up
                </Link>
              </Typography>
            </div>
          </Slide>
          <Slide
            direction="right"
            in={checked}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 800 }}
          >
            <div className="register-form-wrapper">
              <RegisterForm />
              <Typography sx={{ mt: 3 }}>
                Already have an account?{" "}
                <Link
                  onClick={handleChange}
                  variant="body2"
                  sx={{ cursor: "pointer", fontWeight: 800 }}
                >
                  Sign In
                </Link>
              </Typography>
            </div>
          </Slide>
          </Box>        
      </Box>
    </div>
  );
}
