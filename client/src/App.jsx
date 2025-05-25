import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

function App(){
  return(
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '2rem', marginRight: '300px' }}>
        <Editor />
      </div>
      <Sidebar />
    </div>
  )
}

export default App;