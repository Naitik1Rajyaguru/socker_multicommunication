import { useState, useEffect, useRef } from "react";
import { socket } from "../../socket";
import "./Editor.css";

function Editor() {
  const [data, setData] = useState("");
  const dataRef = useRef(data);  

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const handleIncomingData = (incomingData) => {
      if (dataRef.current !== incomingData) {
        console.log("Received update from socket");
        setData(incomingData);
      }
    };

    socket.on("update-text", handleIncomingData);

    return () => {
      socket.off("update-text", handleIncomingData);
    };
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setData(newText);
    socket.emit("edit-text", newText);
  };

  return (
    <div className="editor-container">
      <h2>Collaborative Textarea Editor</h2>
      <textarea
        value={data}
        onChange={handleChange}
        placeholder="Start typing..."
      />
    </div>
  );
}

export default Editor;
