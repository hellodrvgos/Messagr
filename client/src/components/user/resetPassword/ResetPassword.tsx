import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
  OutlinedInput,
  Box,
} from "@mui/material/";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./ResetPassword.css";
// import { getUserInformationByEmail } from "../../../redux/thunk/userInformation";
import { AppDispatch, RootState } from "../../../redux/store";

export default function ResetPassword() {
  // navigate
  const navigate = useNavigate();
  const userData = useSelector(
    (state: RootState) => state.userinformation.userInfo
  );
  console.log(userData, "user data");
  // MUI
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  type InitialValues = {
    email: string;
    password: string;
    confirmPassword: string;
  };
  const initialValues: InitialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch<AppDispatch>();
  //   const { email } = useParams();

  //   useEffect(() => {
  //   dispatch(getUserInformationByEmail(url));

  //   }, [dispatch, email]);
  //   function onResetPasswordHandler(values: InitialValues) {
  //     const url = `http://localhost:8002/users/${values.email}`;
  //     dispatch(getUserInformationByEmail(url));
  //     navigate("/login");
  //   }
  const FormSchema = Yup.object().shape({
    password: Yup.string()
      .required("Required!")
      .min(2, "Password should be minimum 2 chars!")
      .max(50, "Too long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match.")
      .required("Required"),
  });
  // render
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={
          (values) => console.log(values)
          // onResetPasswordHandler
        }
      >
        {({ errors, handleChange, touched, values }) => {
          return (
            <Form>
              <div className="field-container">
                <Paper
                  elevation={4}
                  sx={{
                    mt: 4,
                    height: 350,
                    width: 500,
                    mb: 50,
                  }}
                >
                  <Typography
                    component="div"
                    textAlign="center"
                    sx={{ mt: 2, fontSize: "30px" }}
                  >
                    Reset Password
                  </Typography>

                  <FormControl
                    sx={{ mt: 1, width: "55ch" }}
                    variant="outlined"
                    size="small"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
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
                      }
                      label="Password"
                    />
                  </FormControl>
                  {errors.password && touched.password ? (
                    <p className="error-message"> {errors.password}</p>
                  ) : null}
                  <FormControl
                    sx={{ width: "55ch" }}
                    variant="outlined"
                    size="small"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-confirmPassword"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={values.confirmPassword}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
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
                      }
                      label="Confirm password"
                    />
                  </FormControl>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="error-message"> {errors.confirmPassword}</p>
                  ) : null}
                  <Button
                    type="submit"
                    sx={{
                      mt: 2,
                      width: "67ch",
                      height: "40px",
                    }}
                    variant="outlined"
                    size="small"
                  >
                    Reset
                  </Button>
                </Paper>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
