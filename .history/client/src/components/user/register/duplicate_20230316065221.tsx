/*import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Divider,
  Card,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert, { AlertColor } from '@mui/material/Alert';
import { useState } from "react";

// import "./UpdateProfileForm.css";

export default function RegisterForm() {

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

  // schema
  const FormSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "name too short").max(50, "name too long"),
    lastName: Yup.string().min(2, "name too short").max(50, "name too long"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required('Please Enter your password')
      .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
          "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number"
      ),
  });

  const registerUrl = "http://localhost:8000/users/register";

    const navigate = useNavigate();

  const [isShown, setIsShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");

  const showAlert = (message: string) => {
    setIsShown(true);
    setAlertMessage(message);
  };

  function register(values: InitialValues) {
    axios.post(registerUrl, {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName
    })
    .then((response) => response.data)
    .then((data) => {
      if (data.status !== "success") {
        setAlertSeverity("warning")
        showAlert(data.message);
        setTimeout(() => {setIsShown(false);}, 2000)
        return;
      }
      setAlertSeverity("success")
      showAlert(data.message);
      setTimeout(() => {navigate("/login");}, 1000)
    })
  }
  return (
    <div className="login-page-update">
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema}
          onSubmit={(values) => {
            console.log(values, "values");
            //   const userData = JSON.parse(localStorage.getItem("userDetail")!);
            //   const token = userData.token;
            //    const url = `http://localhost:8002/users/${userId}`;
            //   axios
            //     .put(url, values, {
            //       headers: { Authorization: `Bearer ${token} ` },
            //     })
            //     .then((response) =>
            //       localStorage.setItem(
            //         "updatedDetail",
            //         JSON.stringify(response.data)
            //       )
            //     );
            //   navigate(`/success`);
          }}
        >
          {({ errors, touched, handleChange }) => {
            return (
              <Form>
                <Paper
                  sx={{
                    width: 650,
                    mt: 10,
                    height: 500,
                    mb: 50,
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
                          sx={{ mt: 5, width: 250, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        {errors.email && touched.email ? (
                          <div className="error-message"> {errors.email}</div>
                        ) : null}
                        <TextField
                          label="lastName"
                          name="lastName"
                          sx={{ mt: 1, width: 250 }}
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
                  <Button
                    type="submit"
                    sx={{
                      width: "250px",
                      height: "40px",
                      mt: 1,
                    }}
                    variant="outlined"
                  >
                    Register
                  </Button>
                </Paper>
              </Form>
            );
          }}
        </Formik>
      </div>
      <Box sx={{ mb: 50 }}></Box>
    </div>
  );
}*/