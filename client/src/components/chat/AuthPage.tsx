import { useState } from "react";
import axios from "axios";

const AuthPage = (props: { onAuth: (arg0: { username: any; secret: any; }) => void; }) => {
    
    const [userInput, setUserInput] = useState("")
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const value  = e.target.value;
        axios.post(
            "http://localhost:8002/users/authenticate",
            {username: userInput}
        )
        .then(r => props.onAuth({ ...r.data, secret: userInput}))
        .catch(e => console.log(e, "error"));
        props.onAuth({ username: userInput, secret: userInput });
      };
  
    return (
      <div className="background">
        <form onSubmit={onSubmit} className="form-card">
          <div className="form-title">Welcome 👋</div>
  
          <div className="form-subtitle">Set a username to get started</div>
  
          <div className="auth">
            <div className="auth-label">Username</div>
            <input className="auth-input" name="username" onChange={(e) => setUserInput(e.target.value)}/>
            <button type="submit" className="auth-button">
              Enter
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AuthPage;