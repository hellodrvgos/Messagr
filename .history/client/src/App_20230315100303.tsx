import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import HomePage from "./pages/HomePage";

import "./App.css";
import UserLogin from "./pages/UserLogin";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
