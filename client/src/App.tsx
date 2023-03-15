import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import "./App.css";
import UserLogin from "./pages/UserLogin";
import Update from "./pages/Update";
<<<<<<< HEAD
import UserList from "./components/user/userList/UserList";
import UserProfilePage from "./pages/UserProfilePage";
import NavBar from "./components/navbar/NavBar";
=======
import Chat from "./pages/Chat";
import TopBar from "./components/navigation/TopBar";
import UserRegister from "./pages/UserRegister";
import UserProfilePage from "./pages/UserProfilePage";
import UserList from "./components/user/userList/UserList";
>>>>>>> 713e355b70fca057c5636c5bdf0ddb4858d042c9


//Dragos
function App() {
  return (
    <div className="App">
      <CssBaseline />
<<<<<<< HEAD
      <NavBar />
=======
      <TopBar/>
>>>>>>> 713e355b70fca057c5636c5bdf0ddb4858d042c9
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/register" element={<UserRegister/>}></Route>
        <Route path="/profile" element={<UserProfilePage/>}></Route>
        <Route path="/update" element={<Update />}></Route>
<<<<<<< HEAD
        <Route path="/userlist" element={<UserList />}></Route>
        <Route path="/profile" element={<UserProfilePage />}></Route>
=======
        <Route path="/chat" element={<Chat/>}></Route>
        <Route path="/user-list" element={<UserList/>}></Route>
>>>>>>> 713e355b70fca057c5636c5bdf0ddb4858d042c9
      </Routes>
    </div>
  );
}

export default App;
