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
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../redux/store";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

export default function ResetPassword() {
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter your email"),
    password: Yup.string().required("Please Enter your password"),
  });

  type InitialValues = {
    email: string;
    answer: string;
    password: string;
  };

  const initialValues: InitialValues = {
    email: "",
    answer: "",
    password: "",
  };

  const questionUrl = "http://localhost:8002/users/resetpassword/getquestion";
  const resetPassUrul = "http://localhost:8002/users/resetpassword";

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

  const [question, setQuestion] = useState("");

  function getQuestion(values: InitialValues) {
    if (!values.answer) {
        axios
        .post(questionUrl, {
          email: values.email,
        })
        .then((response) => response.data)
        .then((data) => {
          setQuestion(data);
        });
        return;
    }
    axios
      .patch(resetPassUrul, {
        email: values.email,
        answer: values.answer,
        password: values.password
      })
      .then((response) => response.data)
      .then((data) => {
        showAlert("Password changed!")
      });
      setTimeout(() => {
        navigate("/");
    }, 2000);
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
            // validationSchema={FormSchema}
            onSubmit={getQuestion}
          >
            {({ errors, touched, handleChange }) => {
              return (
                <Form>
                  <Typography variant="h4" sx={{ my: 2 }}>
                    Reset password 🧐
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
                    disabled
                    fullWidth
                    value={question}
                        variant="standard"
                        margin="normal"
                        required
                        label="Secret Question"
                        name="secretQuestion"
                        onChange={handleChange}
                        size="small"
                    />
                    {
                        question !== "" ? (<TextField
                            fullWidth
                                variant="standard"
                                margin="normal"
                                required
                                label="Answer"
                                name="answer"
                                onChange={handleChange}
                                size="small"
                            />) : (<TextField
                            disabled
                            fullWidth
                                variant="standard"
                                margin="normal"
                                required
                                label="Answer"
                                name="answer"
                                onChange={handleChange}
                                size="small"
                            />)
                    }
                    {
                        question !== "" ? (
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
                        ) : (
                            <TextField
                  disabled
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
                        )
                    }
                  
                  {/* {errors.password && touched.password ? (
                    <div className="error-message"> {errors.password}</div>
                  ) : null} */}
                  <Stack spacing={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Send Information
                    </Button>
                  </Stack>
                </Form>
              );
            }}
          </Formik>
          {isShown && <Alert severity="success">{alertMessage}</Alert>}
        </Box>
      </Box>
    </div>
  );
}
