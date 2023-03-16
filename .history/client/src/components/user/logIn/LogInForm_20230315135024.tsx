/*export default function LogInForm() {
  return <div>User Log in here</div>;
}*/
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Form, Formik } from "formik";
import * as Yup from "yup";
//import "./login.css";
import { forwardRef, useState } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = () => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  type InitialType = {
    username: string;
    password: string;
  };

  const initiialValues: InitialType = {
    username: "",
    password: "",
  };

  const SinginSchema = Yup.object().shape({
    username: Yup.string()
      .email("Invalid email")
      .required("Please Enter your username"),
    password: Yup.string()
      .min(7, "It should be more than 6 character")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
      )
      .required("Please Enter your password"),
  });
  const submitHandler = (values: InitialType) => {
    console.log(values);
    setName(values.username);
    handleClick();
    setIsLogin(true);
  };
  return (
    <div className="form-container">
      {!isLogin ? (
        <Formik
          initialValues={initiialValues}
          onSubmit={submitHandler}
          validationSchema={SinginSchema}
        >
          {({ errors, touched, handleChange }) => {
            return (
              <Form className="form">
                <div>
                  <TextField
                    required
                    name="username"
                    label="Username"
                    onChange={handleChange}
                  />
                  {errors.username && touched.username ? (
                    <p>{errors.username}</p>
                  ) : null}
                </div>
                <div>
                  <TextField
                    required
                    name="password"
                    label="Password"
                    onChange={handleChange}
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <p>{errors.password}</p>
                  ) : null}
                </div>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div className="welcome">
          Welcome! <span>{name}</span>
          <Button variant="outlined" onClick={() => setIsLogin(false)}>
            Back
          </Button>
        </div>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You have logged in successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Login;

