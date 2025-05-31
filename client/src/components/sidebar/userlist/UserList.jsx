import { useState, useEffect } from "react";
import { socket } from "../../../socket";
import './UserList.css'

function UserList(){
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        socket.on("update-users", (userList) => {
            setUsers(userList);
        });


        return ()=>{
            socket.off("update-users")
        }
    }, [])

    return(
        <div>
            <ul className="user-list">
            {users.map((user,index)=>(
                <li key={index} className="user-item">
                    👤 {user}
                </li>
            ))}
            </ul>
        </div>
    )

}

export default UserList