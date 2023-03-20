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


function App() {
  return (
    <div className="App">
      <CssBaseline />
      <MenuAppBar/>
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/profile" element={<Update />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/userlist" element={<UserList />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
