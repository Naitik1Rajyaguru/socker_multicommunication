import { useState, useEffect } from "react";
import {socket}  from '../../socket'
import './Editor.css'

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
        <div className="editor-container">
            <h2>Collabrative Editor</h2>
            <textarea name="" id="" value={text} onChange={handleChange} className="editor-textarea"></textarea>
        </div>
    )
    
}

export default Editor;