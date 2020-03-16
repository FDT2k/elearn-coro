import React,{useState} from 'react';
import Files from './components/Files'
import Login from './components/Login'



function App() {
  const [logged,setLogged] = useState(false)

  return (
    <div className="App">
      {logged && <Files/>}
      {!logged && <Login handleLogin={_=>setLogged(true)}/>}
    </div>
  );
}

export default App;
