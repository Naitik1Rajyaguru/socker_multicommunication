import ChatBox from "./ChatBox";
import UserList from "./UserList";

function Sidebar(){
    return (
    <div style={styles.sidebar}>
      <h3>Collaborators</h3>
      <UserList />
      <hr />
      <ChatBox />
    </div>
  );
}

const styles = {
  sidebar: {
    width: '300px',
    height: '100vh',
    padding: '1rem',
    borderLeft: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    right: 0,
    top: 0,
    color: '#000000'
  },
};

export default Sidebar