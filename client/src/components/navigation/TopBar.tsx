import { Link } from "react-router-dom";

export default function TopBar() {
    return (
        <div>
            <Link to="">Home</Link> <span> | </span>
            <Link to="/register">Register</Link> <span> | </span>
            <Link to="/login">Login</Link> <span> | </span>
            <Link to="/update">Update Info</Link> <span> | </span>
            <Link to="/chat">Chat</Link>
        </div>
    )
}