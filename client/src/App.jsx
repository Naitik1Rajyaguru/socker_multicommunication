import { useState, useEffect } from "react";

import Editor from "./components/editor/Editor";
import Sidebar from "./components/sidebar/Sidebar";
import './App.css'
import { socket } from "./socket";
import UserModal from "./components/usermodal/UserModal";

function App(){

  const [userName, setUserName] = useState(sessionStorage.getItem("userName") || "")

  // this is when the componenet get loads
  useEffect(()=>{
    if(userName){
      socket.emit("user-joined", userName)
    }
  },[userName])

  if(!userName){
    return <UserModal onSubmit={setUserName}/>   // on submit it send user name, we use that here- data binding
  }

  return(
    <div className="app-container">      
      <Editor />      
      <Sidebar />
    </div>
  )
}

export default App;