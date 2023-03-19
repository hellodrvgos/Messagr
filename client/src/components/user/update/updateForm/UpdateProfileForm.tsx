import { Formik, Form } from "formik";
import {
  Button,
  TextField,
  Typography,
  Box,
  AlertColor,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import "./UpdateProfileForm.css";
import { RootState, AppDispatch } from "../../../../redux/store";
import { getUserInformation } from "../../../../redux/thunk/userInformation";
import ChooseAvatar from "../../avatar/ChooseAvatar";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

type Avatar = {
  avatar: string;
  setAvatar: Function;
};

export default function UpdateProfileForm({ avatar, setAvatar }: Avatar) {
  const userId = localStorage.getItem("id") || "{}";
  const dispatch = useDispatch<AppDispatch>();
  const [isShown, setIsShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");

  const showAlert = (message: string) => {
    setIsShown(true);
    setAlertMessage(message);
  };

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch, userId]);

  const userInfoDetails = useSelector(
    (state: RootState) => state.userinformation.userInfo
  );
  const navigate = useNavigate();

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
    axios
      .put(
        updateUserUrl,
        {
          firstName:
            values.firstName === ""
              ? `${userInfoDetails.firstName}`
              : values.firstName,
          lastName:
            values.lastName === ""
              ? `${userInfoDetails.lastName}`
              : values.lastName,
          email: `${userInfoDetails.email}`,
          location:
            values.location === ""
              ? `${userInfoDetails.location}`
              : values.location,
          phone:
            values.phone === "" ? `${userInfoDetails.phone}` : values.phone,
          role: values.role === "" ? `${userInfoDetails.role}` : values.role,
          gitHub:
            values.gitHub === "" ? `${userInfoDetails.gitHub}` : values.gitHub,
          avatar: avatar,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  if (userInfoDetails._id === "") {
    return <p>Loding</p>;
  }
  return (
    <div>
      <Box
        sx={{
          my: 1,
          mx: 2,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{ mt: 1, display: "flex", flexDirection: "column", rowGap: 3 }}
        >
          <Formik initialValues={initialValues} onSubmit={updateUsersData}>
            {({ errors, touched, handleChange }) => {
              return (
                <Form>
                  <Typography variant="h4" sx={{ my: 2 }}>
                    My contact details
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
                      label="First Name"
                      name="firstName"
                      defaultValue={userInfoDetails.firstName}
                      onChange={handleChange}
                      sx={{ my: 2, width: "48%", fontSize: "10px" }}
                      size="small"
                    ></TextField>
                    {errors.firstName && touched.firstName ? (
                      <div className="error-message"> {errors.firstName}</div>
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
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      sx={{ width: "48%", my: 2, fontSize: "10px" }}
                      size="small"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
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

                    <Box sx={{ width: "48%", my: 2 }}>
                      <ChooseAvatar setAvatar={setAvatar} />
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
