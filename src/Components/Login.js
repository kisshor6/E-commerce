import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/")
    }
  })
    
    const handleLogin = async()=>{
       
      let result = await fetch("http://localhost:5000/login", {
        method : "POST",
        body : JSON.stringify({email, password}),
        headers : {
          'Content-Type' : 'application/json'
        }
      });
      result = await result.json()
      if (result.auth) {

        localStorage.setItem("user", JSON.stringify(result.user))
        localStorage.setItem("token", JSON.stringify(result.auth))
        navigate("/")
      }else{
        alert("please enter correct details")
      }
    
    }

  return (
    <div className='container'>
          <h1>Login</h1>
          <input className='input_box' type='email' value={email}
          onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' />
          <input className='input_box' type='password' value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
          <button className='submit_button' onClick={handleLogin} type='submit'>Login</button>
    </div>
  )
}

export default Login
