import { useState } from "react";
import './UserModal.css'
import { setUser } from "../../utils/storage";

// onSubmit here is used at time of loading this component anywehre else, this will like call back (it is the function that we passed there)
function UserModal({onSubmit}){
    const [userName, setUserName] = useState('')

    const joinApp = (e)=>{
        e.preventDefault();
        if(!userName.trim) return;
        setUser("userName", userName);        
        // on submit send userName (data binding)
        onSubmit(userName);
    }

    return(
         <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Enter your name</h2>
            <form onSubmit={joinApp}>
              <input
                type="text"
                placeholder="Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
              />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
    )
}

export default UserModal