import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import "./App.css";
import UserLogin from "./pages/UserLogin";
import Update from "./pages/Update";
import Chat from "./pages/Chat";
import TopBar from "./components/navigation/TopBar";
import UserRegister from "./pages/UserRegister";


//Dragos
function App() {
  return (
    <div className="App">
      <CssBaseline />
      <TopBar/>
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/register" element={<UserRegister/>}></Route>
        <Route path="/update" element={<Update />}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
