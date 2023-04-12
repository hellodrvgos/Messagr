import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import HomePage from "./pages/HomePage";
import UserLogin from "./pages/UserLogin";
import Update from "./pages/Update";
import Chat from "./pages/Chat";
import UserList from "./components/user/userList/UserList";
import MenuAppBar from "./components/navigation/TopBar";
import ForgotPassword from "./pages/ForgotPassword";
import { Box, Typography } from "@mui/material";


function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Box sx={{display: { md: 'none', lg: "block" }}}>
      <MenuAppBar/>
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/profile" element={<Update />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/userlist" element={<UserList />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
      </Routes>
      </Box>
      <Box sx={{display: { xs: "flex", lg: "none" }, height: "50vh", justifyContent: "center", alignItems: "center", bgcolor: "white"}}>
          <Typography variant="h6" sx={{fontWeight: "normal"}}>Website is not optimized yet for mobile & tablet screen resolutions. <br/> Please view it on a resolution higher than 1200px.</Typography>
      </Box>
    </div>
  );
}

export default App;
