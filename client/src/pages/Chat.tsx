import { IOType } from "child_process";
import { useEffect, useState } from "react";
import * as io from "socket.io-client";

type ChatType = {
    socket: io.Socket;
    username: string;
    room: string;
}

export default function Chat({socket, username, room}: ChatType) {

    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours
            }
            socket.emit("send_message", messageData);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (messageData) => {
        console.log(messageData, "message data")
        })
    }, [socket])

    return (
        <div>
            This is Chat
            <div>
                <div className="chat-header">
                    Live Chat
                </div>
                <div className="chat-body"></div>
                <div className="chat-footer">
                    <input type="text" 
                    placeholder="Message..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    ></input>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}