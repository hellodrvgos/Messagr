//socketio
import { useState } from "react";
import * as io from "socket.io-client";
import Chat from "./Chat";

//Dragos
//Ataklti
//Mayuri
const socket = io.connect("http://localhost:8001");

export default function HomePage() {

    const [username, setUsername] = useState("");
    // const [room, setRoom] = useState("");

    const room = "TheRoom"

    const joinRoom = () => {
        if (username !== "") {
            socket.emit("join_room", room);
        }
    }

    return (
        <div>
            <p>This is Homepage</p>
            <p>Socket</p>
            <h3>Join Chat</h3>
            <input type="text" onChange={(event) => {
                setUsername(event.target.value);
            }}></input>
            <button onClick={joinRoom}>Join</button>
            <Chat socket={socket} username={username} room={room}/>
        </div>
    )
}