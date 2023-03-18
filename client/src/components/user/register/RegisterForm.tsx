import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
//mui
import {
  Button,
  TextField,
  Paper,
  Typography,
  Divider,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";

import Alert, { AlertColor } from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

import GoogleLogIn from "../googleLogIn/GoogleLogIn";

export default function RegisterForm() {
  // schema
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter your email"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number"
      ),
    firstName: Yup.string().required("Please Enter your First Name"),
    lastName: Yup.string().required("Please Enter your Last Name"),
    
  });
  // type
  type InitialValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    // location: string;
    // phone: string;
    // role: string;
    // gitHub: string;
    // avatar: string;
  };
  // initial values
  const initialValues: InitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // location: "",
    // phone: "",
    // role: "",
    // gitHub: "",
    // avatar: "",
  };

  const registerUrl = "http://localhost:8002/users/register";

  const navigate = useNavigate();

  const [isShown, setIsShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");
  const [avatar, setAvatar] = useState<File | undefined>(undefined);

  const showAlert = (message: string) => {
    setIsShown(true);
    setAlertMessage(message);
  };

  function register(values: InitialValues) {
    axios
      .post(registerUrl, {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        // location: values.location,
        // phone: values.phone,
        // role: values.role,
        // gitHub: values.gitHub,
        // avatar: values.avatar,
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.status !== "success") {
          setAlertSeverity("warning");
          showAlert(data.message);
          setTimeout(() => {
            setIsShown(false);
          }, 2000);
          return;
        }
        setAlertSeverity("success");
        showAlert(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      });
  }

  return (
    <div >
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
          onSubmit={register}
        >
          {({ errors, touched, handleChange }) => {
            return (
              <Form>
              <Typography variant="h4" sx={{ my: 2 }}>
                Create new account
              </Typography>
              <Box sx={{display: "flex", flexDirection:"row", flexWrap: "wrap", columnGap: 2, justifyContent: "left" }}>
              <TextField
              variant="filled"
              margin="normal"
                required
                label="First Name"
                name="firstName"
                onChange={handleChange}
                sx={{ mt: 2, mb: 2, width: "48%", fontSize: "10px" }}
                size="small"
              ></TextField>
              {errors.email && touched.email ? (
                <div className="error-message"> {errors.email}</div>
              ) : null}
              <TextField
              variant="filled"
              margin="normal"
                required
                label="Last Name"
                name="lastName"
                sx={{ mt: 2, mb: 2, width: "48%" }}
                onChange={handleChange}
                size="small"
              />
              {errors.lastName && touched.lastName ? (
                <div className="error-message">{errors.lastName}</div>
              ) : null}
              <TextField
                variant="filled"
                margin="normal"
                required
                label="Email"
                name="email"
                onChange={handleChange}
                sx={{ width: "48%", mb: 2, mt: 2, fontSize: "10px" }}
                size="small"
              ></TextField>
              {errors.email && touched.email ? (
                <div className="error-message"> {errors.email}</div>
              ) : null}
              <TextField
                variant="filled"
                margin="normal"
                required
                label="Password"
                type="password"
                name="password"
                autoComplete="new-password"
                onChange={handleChange}
                sx={{ width: "48%", mb: 2, mt: 2, fontSize: "10px" }}
                size="small"
              ></TextField>
              {errors.email && touched.email ? (
                <div className="error-message"> {errors.email}</div>
              ) : null}
              </Box>
              <Stack spacing={3}>
                <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="I agree with privacy policy"
        />
                {/* <Link href="#" variant="body2" sx={{ textAlign: "left" }}>
                  Forgot password?
                </Link> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Typography variant="h6" sx={{color: "gray"}}>OR</Typography>
                <GoogleLogIn />
              </Stack>
            </Form>
            );
          }}
        </Formik>
        {isShown && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
        </Box>
      </Box>
    </div>
  );
}
