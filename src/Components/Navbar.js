import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.clear();
    console.log("logout");
    navigate("/signup")
  }

  return (
    <div>
      <img
      alt='logo'
      className='logo'
        src='https://is5-ssl.mzstatic.com/image/thumb/Purple126/v4/14/fc/78/14fc7850-6ff2-3917-646e-f895a259db35/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.jpeg/512x512bb.jpg'/>
      { auth ?
        <ul className='nav-ul'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
          <li><Link onClick={logout} to="/signup">Logout  ({JSON.parse(auth).name})</Link></li>
      </ul> :

      <ul className='nav-ul right'>

        <li><Link to="/login">Login</Link></li>
        <li> <Link to="/signup">sign UP</Link></li>

      </ul>
      }
      
    </div>
  )
}

export default Navbar
