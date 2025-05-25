import { useState, useEffect } from "react";
import {socket}  from '../socket'

function Editor(){
    const [text, setText] = useState('');

    useEffect(()=>{
        socket.on("update-text", (text)=>{
            setText(text);
        })        
        return()=>{
        socket.off("update-text")
    }
    }, [])

    const handleChange = (e)=>{
        const newText = e.target.value;
        setText(newText);
        socket.emit("edit-text", newText)
    };

    return(
        <div>
            <h2>Collabrative Editor</h2>
            <textarea name="" id="" value={text} onChange={handleChange} style={{ width: '100%', height: '300px' }}></textarea>
        </div>
    )
    
}

export default Editor;