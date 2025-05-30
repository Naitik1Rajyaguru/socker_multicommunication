import ChatBox from "./chatbox/ChatBox";
import UserList from "./userlist/UserList";
import './Sidebar.css'

function Sidebar(){
    return (
    <div className="sidebar">
      <h3>Collaborators</h3>
      <UserList />
      <hr />
      <ChatBox />
    </div>
  );
}

export default Sidebar