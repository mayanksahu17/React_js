import React , {useState ,useContext} from 'react'
import UserContext from '../context/UserContext';


function Login() {

const  [username, setUsername] = useState("");
const [Password, setPassword] = useState("");

const {setUser} = useContext(UserContext);

const handleSubmit = (e)=>{
        e.preventDefault();
        setUser({username, Password})
}

  return (
    <div>
        <h2>
            <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='username' />

            <input type="password" value={Password} onClick={(e)=>{ setPassword(e.target.value)}} placeholder='Password' />

            <button onClick={handleSubmit}  >Submit</button>
        </h2>
    </div>
  )
}

export default Login