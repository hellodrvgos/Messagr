import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, TextField, Typography, Box, InputAdornment } from "@mui/material";
import Alert, { AlertColor } from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import VisibilityIcon from '@mui/icons-material/Visibility';

import GoogleLogIn from "../googleLogIn/GoogleLogIn";
import ChooseAvatar from "../avatar/ChooseAvatar";
import randomAvatar from "../../../assets/images/avatars/random_avatar.png"


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


export default function RegisterForm() {
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
  type InitialValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: {
      randomAvatar: string;
    }
  };
  const initialValues: InitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: {randomAvatar}
  };

  const registerUrl = "http://localhost:8002/users/register";
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");
  
  const [avatar, setAvatar] = useState(randomAvatar);

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
        avatar: avatar
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
            onSubmit={register}
          >
            {({ errors, touched, handleChange }) => {
              return (
                <Form>
                  <Typography variant="h4" sx={{ my: 2 }}>
                    New account 🤠
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      columnGap: 2,
                      justifyContent: "left",
                    }}
                  >
                    <TextField
                      variant="standard"
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
                      variant="standard"
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
                      variant="standard"
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
                      variant="standard"
                      margin="normal"
                      required
                      label="Password"
                      // type="password"
                      name="password"
                      autoComplete="new-password"
                      onChange={handleChange}
                      sx={{ width: "48%", mb: 2, mt: 2, fontSize: "10px" }}
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
                    ></TextField>
                    {errors.email && touched.email ? (
                      <div className="error-message"> {errors.email}</div>
                    ) : null}
                  </Box>
                  <Stack spacing={3}>
                    <ChooseAvatar setAvatar={setAvatar} />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
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
          {isShown && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
        </Box>
      </Box>
    </div>
  );
}
