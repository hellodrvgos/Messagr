import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import GoogleLogIn from "../googleLogIn/GoogleLogIn";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../redux/store";
import { userInfoActions } from "../../../redux/slice/userInformation";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

export default function LoginForm() {
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter your email"),
    password: Yup.string().required("Please Enter your password"),
  });

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const loginUrl = "http://localhost:8002/users/login";

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isShown, setIsShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message: string) => {
    setIsShown(true);
    setAlertMessage(message);
    setTimeout(() => {
      setIsShown(false);
    }, 2000);
  };

  function login(values: InitialValues) {
    axios
      .post(loginUrl, {
        email: values.email,
        password: values.password,
      })
      .then((response) => response.data)
      .then((data) => {
        if (!data.message) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          dispatch(userInfoActions.getLogInInfo(true));
          navigate("/chat");
          return;
        }
        showAlert(data.message);
      });
  }

  type InitialValues = {
    email: string;
    password: string;
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <Box
        sx={{
          my: 1,
          mx: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ mt: 1, display: "flex", flexDirection: "column", rowGap: 3 }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={FormSchema}
            onSubmit={login}
          >
            {({ errors, touched, handleChange }) => {
              return (
                <Form>
                  <Typography variant="h4" sx={{ my: 2 }}>
                    Welcome back 😃
                  </Typography>
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    size="small"
                  />
                  {errors.email && touched.email ? (
                    <div className="error-message"> {errors.email}</div>
                  ) : null}
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    // type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    size="small"

                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: 
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                  {errors.password && touched.password ? (
                    <div className="error-message"> {errors.password}</div>
                  ) : null}
                  <Stack spacing={3}>
                    <Link
                      href="/forgotpassword"
                      variant="body2"
                      sx={{ textAlign: "left", mt: 2 }}
                    >
                      Forgot password?
                    </Link>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Typography variant="h6" sx={{ color: "gray" }}>
                      OR
                    </Typography>
                    <GoogleLogIn />
                  </Stack>
                </Form>
              );
            }}
          </Formik>
          {isShown && <Alert severity="warning">{alertMessage}</Alert>}
        </Box>
      </Box>
    </div>
  );
}
