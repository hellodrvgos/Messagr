import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Alert from "@mui/material/Alert";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import GoogleLogIn from "../googleLogIn/GoogleLogIn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { userInfoActions } from "../../../redux/slice/userInformation";
import { userActions } from "../../../redux/slice/userSlice";

export default function LoginForm() {
  // state
  const bannedMsg = useSelector(
    (state: RootState) => state.users.bannedMessage
  );
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
        dispatch(userActions.displayBannedMessage(data.message));
        showAlert(data.message);
      });
  }

  type InitialValues = {
    email: string;
    password: string;
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
                    Welcome back
                  </Typography>
                  <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    // autoFocus
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <div className="error-message"> {errors.email}</div>
                  ) : null}
                  <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                  {errors.password && touched.password ? (
                    <div className="error-message"> {errors.password}</div>
                  ) : null}
                  <Stack spacing={3}>
                    {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            /> */}
                    <Link
                      href="/reset-password"
                      variant="body2"
                      sx={{ textAlign: "left" }}
                    >
                      Forgot password?
                    </Link>
                    {bannedMsg ? (
                      <div className="error-message">{bannedMsg}</div>
                    ) : null}
                    <Button
                      type="submit"
                      // fullWidth
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
