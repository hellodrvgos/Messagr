import {Routes, Route} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import './App.css';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
