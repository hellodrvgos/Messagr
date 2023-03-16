import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
    location: string;
    phone: number;
    role: string;
    gitHub: string;
    avatar: string;
  };
  // initial values
  const initialValues: InitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    phone: 1,
    role: "",
    gitHub: "",
    avatar: "",
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
    <div className="login-page-update">
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema}
          onSubmit={register}
        >
          {({ errors, touched, handleChange }) => {
            return (
              <Form>
                <Paper
                  sx={{
                    width: 650,
                    mt: 10,
                    height: 550,
                    mb: 5,
                    borderRadius: 10,
                  }}
                >
                  <Typography sx={{ fontSize: "30px", m: 3 }}>
                    Register
                  </Typography>
                  <Divider />
                  <div className="form-container">
                    <div className="form-field">
                      <div className="first-column">
                        <TextField
                          label="firstName"
                          name="firstName"
                          onChange={handleChange}
                          sx={{ mt: 2, mb: 2, width: 250, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        {errors.email && touched.email ? (
                          <div className="error-message"> {errors.email}</div>
                        ) : null}
                        <TextField
                          label="lastName"
                          name="lastName"
                          sx={{ mt: 2, mb: 2, width: 250 }}
                          onChange={handleChange}
                          size="small"
                        />
                        {errors.lastName && touched.lastName ? (
                          <div className="error-message">{errors.lastName}</div>
                        ) : null}

                        <TextField
                          label="Email"
                          name="email"
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        {errors.email && touched.email ? (
                          <div className="error-message"> {errors.email}</div>
                        ) : null}
                        <TextField
                          required
                          label="password"
                          type="password"
                          name="password"
                          autoComplete="new-password"
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        {errors.email && touched.email ? (
                          <div className="error-message"> {errors.email}</div>
                        ) : null}
                        <TextField
                          label="Location"
                          name="location"
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                      </div>
                      <div className="second-column">
                        <TextField
                          label="role"
                          name="role"
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        <TextField
                          label="gitHub"
                          name="gitHub"
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        <TextField
                          label="phonenumber"
                          name="phonenumber"
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        <TextField
                          label="avatar"
                          name="avatar"
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                      </div>
                    </div>
                  </div>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Subscribe to Newsletter"
                  />
                  <div>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        width: "250px",
                        height: "40px",
                        mt: 1,
                      }}
                    >
                      Register
                    </Button>
                  </div>
                </Paper>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Form>
            );
          }}
        </Formik>
        {isShown && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
      </div>
    </div>
  );
}
