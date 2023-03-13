import {Routes, Route} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import HomePage from "./pages/HomePage";

import './App.css';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="" element={<HomePage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
