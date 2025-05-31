import { useState, useEffect, useRef } from "react";
import {socket}  from '../../socket';
import './Editor.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function Editor(){
    const [data, setData] = useState('');
    const dataRef = useRef(data);

    useEffect(()=>{
        dataRef.current = data;
    }, [data])

    useEffect(()=>{

        socket.on("update-text", (incomingData)=>{   
            if(dataRef.current!=incomingData){                        
                setData(incomingData);   
            }
                 
        })

        return()=>{
            socket.off("update-text")
        }
    }, [])

    const handleChange = (event, editor)=>{
        // const newText = e.target.value;
        const newData = editor.getData();
        setData(newData);
        socket.emit("edit-text", newData)
    };

    return(
        <div className="editor-container">
            <h2>Collabrative Editor</h2>

            <CKEditor editor={ClassicEditor} data={data} onChange={handleChange} />
        </div>
    )
    
}

export default Editor;