import { useState, useEffect } from "react";
import { socket } from "../socket";

function ChatBox(){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('')

    useEffect(()=>{
        socket.on("receive-chat", (data)=>{
            setMessages((prev)=>[...prev, data]);
        })

        return()=>{
            socket.off("receive-chat")
        }
    }, [])


    const sendMessage =(e)=>{
        e.preventDefault();
        if(!input.trim()) return        
        socket.emit("send-chat", input);
        setInput('')
    }


    return(
        <div style={styles.container}>
            <div style={styles.messages}>
                {messages.map((msg, idx) => (
                <div key={idx} style={styles.messageItem}>
                    <strong>{msg.user}: </strong>
                    <span>{msg.msg}</span>
                </div>
                ))}
            </div>

            <form onSubmit={sendMessage} style={styles.form}>
                <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={styles.input}
                />
                <button type="submit" style={styles.button}>Send</button>
            </form>
        </div>   
    )
}

const styles = {
  container: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    maxHeight: '200px',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    padding: '0.5rem',
    backgroundColor: '#fff',
  },
  messageItem: {
    marginBottom: '0.5rem',
  },
  form: {
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    fontSize: '14px',
  },
  button: {
    padding: '0.5rem 1rem',
    marginLeft: '0.5rem',
  },
};


export default ChatBox