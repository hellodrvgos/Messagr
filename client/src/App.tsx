import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import HomePage from "./pages/HomePage";
import UserLogin from "./pages/UserLogin";
import Update from "./pages/Update";
import Chat from "./pages/Chat";
import UserRegister from "./pages/UserRegister";
import UserList from "./components/user/userList/UserList";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/register" element={<UserRegister />}></Route>
        <Route path="/update" element={<Update />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/userlist" element={<UserList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
