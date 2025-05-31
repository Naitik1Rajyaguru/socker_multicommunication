import { useState, useEffect } from "react";

import Editor from "./components/editor/Editor";
import Sidebar from "./components/sidebar/Sidebar";
import './App.css'
import { socket } from "./socket";
import UserModal from "./components/usermodal/UserModal";
import { getUser, setUser } from "./utils/storage";

function App(){

  const storedUserName = getUser('userName') || '';
  const storeduserID = getUser("userID") || '';


  const [userName, setUserName] = useState(storedUserName || "")
  const [userID, setUserID] = useState(storeduserID || "")

  function setUserData(name){
    setUserName(name)
    const newUserID = crypto.randomUUID()  
    setUserID(newUserID)            
    setUser("userID", newUserID)
  }

  // this is when the componenet chages somethng, so when UserModal join, something changes, so this will get called
  useEffect(()=>{
    if(userID){       
      socket.emit("user-joined", {userName, userID})
    }
  },[userName, userID])

  if(!userName){
    return <UserModal onSubmit={setUserData}/>   // on submit it send user name, we use that here- data binding
  }

  return(
    <div className="app-container">      
      <Editor />      
      <Sidebar />
    </div>
  )
}

export default App;