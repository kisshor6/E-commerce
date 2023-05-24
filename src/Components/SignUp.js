import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/")
    }
  })

  const collectData = async()=>{
    let result = await fetch("http://localhost:5000/register", {
      method : "POST",
      body: JSON.stringify({ name, email, password }),
      headers : {
        'Content-Type': 'application/json'
      },
    });
    result = await result.json()

    if (result) {
      localStorage.setItem("user", JSON.stringify(result.result))
      localStorage.setItem("token", JSON.stringify(result.auth))
      console.warn(result);
      navigate("/")
    }
  }

  return (
    <div className='container'>
      <h1>Register</h1>
      <input className='input_box' type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
      <input className='input_box' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
      <input className='input_box' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/>
      <button className='submit_button' onClick={collectData} type='submit'>Sign Up</button>
    </div>
  )
}

export default SignUp
