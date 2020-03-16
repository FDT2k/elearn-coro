import React,{useState} from 'react';
import Files from './components/Files'
import Login from './components/Login'
import Wip from './components/Wip'


const isWip = process.env.REACT_APP_WIP ==='yes'

function App() {
  const [logged,setLogged] = useState(false)

  return (
    <div className="App theme-light">
      {isWip &&   <Wip/>}
      {!isWip && logged && <Files handleLogin={_=>setLogged(false)}/>}
      {!isWip && !logged && <Login handleLogin={_=>setLogged(true)}/>}


    </div>
  );
}

export default App;
