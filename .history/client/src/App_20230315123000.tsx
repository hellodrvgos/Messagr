import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import "./App.css";
import UserLogin from "./pages/UserLogin";
import Update from "./pages/Update";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/update" element={<Update />}></Route>
      </Routes>
    </div>
  );
}

export default App;
