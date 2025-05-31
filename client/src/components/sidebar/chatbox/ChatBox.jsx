import { useState, useEffect } from "react";
import { socket } from "../../../socket";
import './ChatBox.css'
import { getUser } from "../../../utils/storage";

function ChatBox(){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('')
    const userName = getUser('userName') || '';

    useEffect(()=>{        
        socket.on("user-chat-history", (history)=>{
            setMessages(history);                      
        })

        socket.on("receive-chat", (data)=>{
            setMessages((prev)=>[...prev, data]);
        })

        return()=>{
            socket.off("receive-chat");
            socket.off("user-chat-history");
        }
    }, [messages])


    const sendMessage =(e)=>{
        e.preventDefault();
        if(!input.trim()) return             
        socket.emit("send-chat", {user:userName, msg:input});
        setInput('')
    }


    return(                
        <div className="chat-box">
            <div className="chat-messages">
                {messages.map((msg, idx) => (                    
                <div key={idx} className="chat-message">
                    <strong>{msg.user}: </strong>
                    <span>{msg.msg}</span>
                </div>
                ))}
            </div>

            <form onSubmit={sendMessage} className="chat-form">
                <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}     
                className="chat-input"                       
                />
                <button type="submit" className="chat-button">Send</button>
            </form>
        </div>   
    )
}



export default ChatBox