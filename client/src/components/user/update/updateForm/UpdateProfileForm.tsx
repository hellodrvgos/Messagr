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

import ChooseAvatar from "../../register/ChooseAvatar";


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
  console.log(token, "token from update");
  const updateUserUrl = `http://localhost:8002/users/${userId}`;

  function updateUsersData(values: InitialValues) {
    axios.put(
      updateUserUrl,
      {
          firstName: values.firstName === "" ? `${userInfoDetails.firstName}` : values.firstName,
          lastName: values.lastName === "" ? `${userInfoDetails.lastName}` : values.lastName,
          email: `${userInfoDetails.email}`,
          location: values.location === "" ? `${userInfoDetails.location}` : values.location,
          phone: values.phone === "" ? `${userInfoDetails.phone}` : values.phone,
          role: values.role === "" ? `${userInfoDetails.role}` : values.role,
          gitHub: values.gitHub === "" ? `${userInfoDetails.gitHub}` : values.gitHub,
          avatar: values.avatar === "" ? `${userInfoDetails.avatar}` : values.avatar
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // navigate("/success");
  }
if (userInfoDetails._id === "") {
  return <p>Loding</p>
}
  return (
    // <div className="login-page-update">
    //   <div className="form-container">
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

        <Formik initialValues={initialValues} onSubmit={updateUsersData}>
          {({ errors, touched, handleChange }) => {
            return (
              <Form>
                {/* <Paper
                  sx={{
                    width: 600,
                    // mt: 10,
                    height: 550,
                    // mb: 50,
                    borderRadius: 10,
                  }}
                > */}
              <Typography variant="h4" sx={{ my: 2 }}>
                My contact details
              </Typography>
                  {/* <Divider /> */}
                  <Box sx={{display: "flex", flexDirection:"row", flexWrap: "wrap", columnGap: 2, justifyContent: "left" }}>
                  {/* <div className="form-container"> */}
                    {/* <div className="form-field"> */}
                      {/* <div className="first-column"> */}
                        <TextField
                        variant="standard"
                        margin="normal"
                          label="First Name"
                          name="firstName"
                          defaultValue={userInfoDetails.firstName}
                          onChange={handleChange}
                          sx={{ my: 2, width: "48%", fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        {errors.firstName && touched.firstName ? (
                          <div className="error-message">
                            {" "}
                            {errors.firstName}
                          </div>
                        ) : null}
                        <TextField
                        variant="standard"
                        margin="normal"
                          label="Last Name"
                          name="lastName"
                          defaultValue={userInfoDetails.lastName}
                          sx={{ my: 2, width: "48%" }}
                          onChange={handleChange}
                          size="small"
                        />
                        {errors.lastName && touched.lastName ? (
                          <div className="error-message">{errors.lastName}</div>
                        ) : null}

                        <TextField
                          disabled
                          variant="standard"
                          margin="normal"
                          label="Email"
                          name="email"
                          defaultValue={userInfoDetails.email}
                          onChange={handleChange}
                          sx={{ width: "48%", my: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        {errors.email && touched.email ? (
                          <div className="error-message"> {errors.email}</div>
                        ) : null}
                        <TextField
                          variant="standard"
                          margin="normal"
                          //label={userInfoDetails?.password}
                          label = "Password"
                          name="password"
                          onChange={handleChange}
                          sx={{ width: "48%", my: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                          {errors.email && touched.email ? (
                          <div className="error-message"> {errors.email}</div>
                        ) : null}
                        <TextField
                          variant="standard"
                          margin="normal"
                          label="Location"
                          name="location"
                          defaultValue={userInfoDetails.location}
                          onChange={handleChange}
                          sx={{ width: "48%", my: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                          {errors.location && touched.location ? (
                          <div className="error-message"> {errors.location}</div>
                        ) : null}
                      {/* </div> */}
                      {/* <div className="second-column"> */}
                        <TextField
                          variant="standard"
                          margin="normal"
                          label="Role"
                          name="role"
                          defaultValue={userInfoDetails.role}
                          onChange={handleChange}
                          sx={{ width: "48%", my: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                          {errors.role && touched.role ? (
                          <div className="error-message"> {errors.role}</div>
                        ) : null}
                        <TextField
                          variant="standard"
                          margin="normal"
                          label="GitHub Username"
                          name="gitHub"
                          defaultValue={userInfoDetails.gitHub}
                          onChange={handleChange}
                          sx={{ width: "48%", my: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                          {errors.gitHub && touched.gitHub ? (
                          <div className="error-message"> {errors.gitHub}</div>
                        ) : null}
                        <TextField
                          variant="standard"
                          margin="normal"
                          label="Phone Number"
                          name="phone"
                          defaultValue={userInfoDetails.phone}
                          onChange={handleChange}
                          sx={{ width: "48%", my: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField>
                        {errors.phone && touched.phone ? (
                          <div className="error-message"> {errors.phone}</div>
                        ) : null}
                        {/* <TextField
                          label="Avatar"
                          name="avatar"
                          defaultValue={userInfoDetails.avatar}
                          onChange={handleChange}
                          sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
                          size="small"
                        ></TextField> */}
                      {/* </div> */}
                    {/* </div> */}
                  {/* </div> */}
                  <Box sx={{ width: "48%", my: 2}}>
                  <ChooseAvatar />
                  </Box>
                  </Box>
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 5 }}
                >
                  Update Information
                </Button>
                {/* </Paper> */}
              </Form>
            );
          }}
        </Formik>
        </Box>
      </Box>
      </div>
      // {/* <Box sx={{ mb: 50 }}></Box> */}
    // </div>
  );
}

// import { Formik, Form } from "formik";
// // import { useDispatch, useSelector } from "react-redux";
// // import { RootState } from "../../../../redux/store";
// import * as Yup from "yup";
// import {
//   Button,
//   TextField,
//   Paper,
//   Typography,
//   Divider,
//   Card,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import "./UpdateProfileForm.css";

// import { RootState, AppDispatch } from "../../../../redux/store";
// import { getUserInformation } from "../../../../redux/thunk/userInformation";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { useSingleChatLogic } from "react-chat-engine-advanced";

// export default function UpdateProfileForm() {

//   const userId = localStorage.getItem("id") || "{}";

//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//      dispatch(getUserInformation());
//   }, [dispatch, userId]);

//   const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

//   console.log(userInfoDetails, "update profile")

//   //  get user id from redux
//   const navigate = useNavigate();
//   // type
//   type InitialValues = {
//     firstName: string;
//     lastName: string;
//     email: string;
//     location: string;
//     phone: string;
//     role: string;
//     gitHub: string;
//     avatar: string;
//   };
//   // initial values

// const [initialValues, setInitialValues] = useState<InitialValues>({
//   firstName: `${userInfoDetails.firstName}`,
//   lastName: `${userInfoDetails.lastName}`,
//   email: `${userInfoDetails.email}`,
//   location: `${userInfoDetails.location}`,
//   phone: `${userInfoDetails.phone}`,
//   role: `${userInfoDetails.role}`,
//   gitHub: `${userInfoDetails.gitHub}`,
//   avatar: `${userInfoDetails.avatar}`,
// });

// // useEffect(() => {
// //   if (userInfoDetails._id !== "") {
// //     // const initialValues: InitialValues = {
// //     //   firstName: `${userInfoDetails.firstName}`,
// //     //   lastName: `${userInfoDetails.lastName}`,
// //     //   email: `${userInfoDetails.email}`,
// //     //   location: `${userInfoDetails.location}`,
// //     //   phone: `${userInfoDetails.phone}`,
// //     //   role: `${userInfoDetails.role}`,
// //     //   gitHub: `${userInfoDetails.gitHub}`,
// //     //   avatar: `${userInfoDetails.avatar}`,
// //       setInitialValues({
// //         firstName: `${userInfoDetails.firstName}`,
// //       lastName: `${userInfoDetails.lastName}`,
// //       email: `${userInfoDetails.email}`,
// //       location: `${userInfoDetails.location}`,
// //       phone: `${userInfoDetails.phone}`,
// //       role: `${userInfoDetails.role}`,
// //       gitHub: `${userInfoDetails.gitHub}`,
// //       avatar: `${userInfoDetails.avatar}`,
// //       });
// //     // };
// //     console.log(initialValues, "initialValues inside")

// //   }
// // }, [])

//   console.log(initialValues, "initialValues")


//   const token = localStorage.getItem("token");

//   const updateUserUrl = `http://localhost:8002/users/${userId}`;

//   function updateUsersData(values: InitialValues) {
//       axios.put(updateUserUrl, {
//         firstName: values.firstName === "" ? `${userInfoDetails.firstName}` : values.firstName,
//         lastName: values.lastName === "" ? `${userInfoDetails.lastName}` : values.lastName,
//         email: `${userInfoDetails.email}`,
//         location: values.location === "" ? `${userInfoDetails.location}` : values.location,
//         phone: values.phone === "" ? `${userInfoDetails.phone}` : values.phone,
//         role: values.role === "" ? `${userInfoDetails.role}` : values.role,
//         gitHub: values.gitHub === "" ? `${userInfoDetails.gitHub}` : values.gitHub,
//         avatar: values.avatar === "" ? `${userInfoDetails.avatar}` : values.avatar
//       }, {headers: {Authorization: `Bearer ${token}`}});
//       console.log(values, "values")
//   }

//     // schema

//     // const FormSchema = Yup.object().shape({
//     //   firstName: Yup.string().min(2, "name too short").max(50, "name too long"),
//     //   lastName: Yup.string().min(2, "name too short").max(50, "name too long"),
//     //   email: Yup.string().email("Invalid email").required("Required"),
//     // });

//     // const FormSchema = Yup.object().shape({
//     //   firstName: Yup.string().min(2, "name too short").max(50, "name too long"),
//     //   lastName: Yup.string().min(2, "name too short").max(50, "name too long"),
//     //   email: Yup.string().email("Invalid email"),
//     // });
// if (userInfoDetails._id === "") {
//   return <p>Loding</p>
// }
//   return (
//     <div className="login-page-update">
//       <div className="form-container">
//         <Formik
//            initialValues={initialValues}
//           // validationSchema={FormSchema}
//           // onSubmit={(values) => {
//           //   console.log(values, "values");
//           //     const userData = JSON.parse(localStorage.getItem("userDetail")!);
//           //     // const token = userData.token;
//           //      const url = `http://localhost:8002/users/${userId}`;
//           //     axios
//           //       .put(url, values, {
//           //         headers: { Authorization: `Bearer ${token} ` },
//           //       })
//           //       .then((response) =>
//           //         localStorage.setItem(
//           //           "updatedDetail",
//           //           JSON.stringify(response.data)
//           //         )
//           //       );
//           //     // navigate(`/success`);
//           // }}
//           onSubmit={updateUsersData}
//         >
//           {({ errors, touched, handleChange }) => {
//             return (
//               <Form>
//                 <Paper
//                   sx={{
//                     width: 600,
//                     mt: 10,
//                     height: 550,
//                     mb: 50,
//                     borderRadius: 10,
//                   }}
//                 >
//                   <Typography sx={{ fontSize: "30px", m: 3 }}>
//                     Edit Detail
//                   </Typography>
//                   <Divider />
//                   <div className="form-container">
//                     <div className="form-field">
//                       <div className="first-column">
//                         <TextField
//                           label="firstName"
//                           name="firstName"
//                           defaultValue={userInfoDetails.firstName}
//                           onChange={handleChange}
//                           sx={{ mt: 5, width: 250, fontSize: "10px" }}
//                           size="small"
//                         ></TextField>
//                         {errors.firstName && touched.firstName ? (
//                           <div className="error-message">
//                             {" "}
//                             {errors.firstName}
//                           </div>
//                         ) : null}
//                         <TextField
//                           label="lastName"
//                           name="lastName"
//                           defaultValue={userInfoDetails.lastName}
//                           sx={{ mt: 1, width: 250 }}
//                           onChange={handleChange}
//                           size="small"
//                         />
//                         {errors.lastName && touched.lastName ? (
//                           <div className="error-message">{errors.lastName}</div>
//                         ) : null}

//                         <TextField
//                         disabled
//                           label="Email"
//                           name="email"
//                           defaultValue={userInfoDetails.email}
//                           // value={userInfoDetails.email}
//                           onChange={handleChange}
//                           sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
//                           size="small"
//                         ></TextField>
//                         {errors.email && touched.email ? (
//                           <div className="error-message"> {errors.email}</div>
//                         ) : null}
//                         <TextField
//                           label="password"
//                           name="password"
//                           onChange={handleChange}
//                           sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
//                           size="small"
//                         ></TextField>
//                         <TextField
//                           label="Location"
//                           name="location"
//                           defaultValue={userInfoDetails.location}
//                           onChange={handleChange}
//                           sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
//                           size="small"
//                         ></TextField>
//                       </div>
//                       <div className="second-column">
//                         <TextField
//                           placeholder="Your role..."
//                           label="role"
//                           name="role"
//                           defaultValue={userInfoDetails.role}
//                           onChange={handleChange}
//                           sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
//                           size="small"
//                         ></TextField>
//                         <TextField
//                           label="gitHub"
//                           name="gitHub"
//                           defaultValue={userInfoDetails.gitHub}
//                           onChange={handleChange}
//                           sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
//                           size="small"
//                         ></TextField>
//                         <TextField
//                           label="Phone"
//                           name="phone"
//                           defaultValue={userInfoDetails.phone}
//                           onChange={handleChange}
//                           sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
//                           size="small"
//                         ></TextField>
//                         <TextField
//                           label="avatar"
//                           name="avatar"
//                           defaultValue={userInfoDetails.avatar}
//                           onChange={handleChange}
//                           sx={{ width: 250, mb: 2, mt: 2, fontSize: "10px" }}
//                           size="small"
//                         ></TextField>
//                       </div>
//                     </div>
//                   </div>
//                   <Button
//                     type="submit"
//                     sx={{
//                       width: "250px",
//                       height: "40px",
//                       mt: 1,
//                     }}
//                     variant="outlined"
//                   >
//                     Update
//                   </Button>
//                 </Paper>
//               </Form>
//             );
//           }}
//         </Formik>
//       </div>
//       <Box sx={{ mb: 50 }}></Box>
//     </div>
//   );
// }