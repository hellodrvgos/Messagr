import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import "./App.css";
import UserLogin from "./pages/UserLogin";
import Update from "./pages/Update";
import UserList from "./components/user/userList/UserList";
import UserProfilePage from "./pages/UserProfilePage";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/update" element={<Update />}></Route>
        <Route path="/userlist" element={<UserList />}></Route>
        <Route path="/profile" element={<UserProfilePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
