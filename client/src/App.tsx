import {Routes, Route} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import './App.css';
import Chat from "./pages/Chat";

//Dragos
function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
