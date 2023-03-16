import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import HomePage from "./pages/HomePage";

import "./App.css";
import UserLogin from "./pages/UserLogin";
import Update from "./pages/Update";
import Chat from "./pages/Chat";
import TopBar from "./components/navigation/TopBar";
import UserRegister from "./pages/UserRegister";
import UserProfilePage from "./pages/UserProfilePage";
import UserList from "./components/user/userList/UserList";


function App() {
  return (
    <div className="App">
      <CssBaseline />
      <TopBar/>
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/register" element={<UserRegister/>}></Route>
        <Route path="/profile" element={<UserProfilePage/>}></Route>
        <Route path="/update" element={<Update />}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
        <Route path="/user-list" element={<UserList/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
