import { Formik, Form } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../../redux/store";
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

import "./UpdateProfileForm.css";

import { RootState, AppDispatch } from "../../../../redux/store";
import { getUserInformation } from "../../../../redux/thunk/userInformation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function UpdateProfileForm() {
  const userId = localStorage.getItem("id") || "{}";

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch, userId]);

  const userInfoDetails = useSelector(
    (state: RootState) => state.userinformation.userInfo
  );

  //  get user id from redux
  const navigate = useNavigate();
  // type
  type InitialValues = {
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    phone: string;
    role: string;
    gitHub: string;
    avatar: string;
  };
  // initial values
  const initialValues: InitialValues = {
    firstName: `${userInfoDetails.firstName}`,
    lastName: `${userInfoDetails.lastName}`,
    email: `${userInfoDetails.email}`,
    location: `${userInfoDetails.location}`,
    phone: `${userInfoDetails.phone}`,
    role: `${userInfoDetails.role}`,
    gitHub: `${userInfoDetails.gitHub}`,
    avatar: `${userInfoDetails.avatar}`,
  };

  const token = localStorage.getItem("token");

  const updateUserUrl = `http://localhost:8002/users/${userId}`;

  function updateUsersData(values: InitialValues) {
    axios.put(
      updateUserUrl,
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        location: values.location,
        phone: values.phone,
        role: values.role,
        gitHub: values.gitHub,
        avatar: values.avatar,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // schema

    // const FormSchema = Yup.object().shape({
    //   firstName: Yup.string().min(2, "name too short").max(50, "name too long"),
    //   lastName: Yup.string().min(2, "name too short").max(50, "name too long"),
    //   email: Yup.string().email("Invalid email").required("Required"),
    // });

    // const FormSchema = Yup.object().shape({
    //   firstName: Yup.string().min(2, "name too short").max(50, "name too long"),
    //   lastName: Yup.string().min(2, "name too short").max(50, "name too long"),
    //   email: Yup.string().email("Invalid email"),
    // });
    navigate("/success");
  }

  return (
    <div className="login-page-update">
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          // validationSchema={FormSchema}
          // onSubmit={(values) => {
          //   console.log(values, "values");
          //     const userData = JSON.parse(localStorage.getItem("userDetail")!);
          //     const token = userData.token;
          //      const url = `http://localhost:8002/users/${userId}`;
          //     axios
          //       .put(url, values, {
          //         headers: { Authorization: `Bearer ${token} ` },
          //       })
          //       .then((response) =>
          //         localStorage.setItem(
          //           "updatedDetail",
          //           JSON.stringify(response.data)
          //         )
          //       );
          //     navigate(`/success`);
          // }}
          onSubmit={updateUsersData}
        >
          {({ errors, touched, handleChange }) => {
            return (
              <Form>
                <Paper
                  sx={{
                    width: 600,
                    mt: 10,
                    height: 550,
                    mb: 50,
                    borderRadius: 10,
                  }}
                >
                  <Typography sx={{ fontSize: "30px", m: 3 }}>
                    Edit Detail
                  </Typography>
                  <Divider />
                  <div className="form-container">
                    <div className="form-field">
                      <div className="first-column">
                        <TextField
                          label="firstName"
                          name="firstName"
                          defaultValue={userInfoDetails.firstName}
                          onChange={handleChange}
                          sx={{ mt: 5, width: 250, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        {errors.firstName && touched.firstName ? (
                          <div className="error-message">
                            {" "}
                            {errors.firstName}
                          </div>
                        ) : null}
                        <TextField
                          label="lastName"
                          name="lastName"
                          defaultValue={userInfoDetails.lastName}
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
                          defaultValue={userInfoDetails.email}
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        {errors.email && touched.email ? (
                          <div className="error-message"> {errors.email}</div>
                        ) : null}
                        <TextField
                          label="password"
                          name="password"
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        <TextField
                          label="Location"
                          name="location"
                          defaultValue={userInfoDetails.location}
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                      </div>
                      <div className="second-column">
                        <TextField
                          placeholder="Your role..."
                          label="role"
                          name="role"
                          defaultValue={userInfoDetails.role}
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        <TextField
                          label="gitHub"
                          name="gitHub"
                          defaultValue={userInfoDetails.gitHub}
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        <TextField
                          label="Phone"
                          name="phone"
                          defaultValue={userInfoDetails.phone}
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        <TextField
                          label="avatar"
                          name="avatar"
                          defaultValue={userInfoDetails.avatar}
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
                    Update
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
}
