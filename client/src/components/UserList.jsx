import { useState, useEffect } from "react";
import { socket } from "../socket";

function UserList(){
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        socket.on("update-users", (userList)=>{
            setUsers(userList)
        })

        return ()=>{
            socket.off("update-users")
        }
    }, [])

    return(
        <div>
            <ul style={styles.list}>
            {users.map((user,index)=>(
                <li key={index} style={styles.userItems}>
                    👤 {user}
                </li>
            ))}
            </ul>
        </div>
    )

}

const styles = {
        list:{
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        userItems:{
            padding: '4px 0',
            borderBottom: '1px solid #ddd',
        }
    }

export default UserList