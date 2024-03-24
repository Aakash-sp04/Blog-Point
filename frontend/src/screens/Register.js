import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import BASE_URL from '../endpoint'

export default function Register() {
  //Maintaining state for user-register info
  const [userInfo, setUserInfo] = useState({username : "", email : "", password : ""})
  
  const navigate = useNavigate()
  
  const handleSubmit = async(e)=>{
    e.preventDefault(); //preventing loading effect on-submitting form

    const options = {
      method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
          {username : userInfo.username, email : userInfo.email, password : userInfo.password}
        ),
    }
    const response = await fetch(`${BASE_URL}/api/createuser`, options)
    const json = await response.json()
    console.log(json);

    if(!json.success){  //if we get {success : false from Backend}
      alert('Enter valid and unique username or password')
    }else{
      navigate('/login')
    }
  }

  //On-change input value event
  function handleChange(e){
    const {name, value} = e.target
    setUserInfo((prevValue)=>{
      return(
        {...prevValue, [name]:value}
      )
    })
  }

  return (
    <div style={{backgroundImage: "url(/images/login1.avif)", backgroundSize: '100% 100%', height: '120vh' , paddingTop : '7%'}}>
      <Navbar />
      
      <div className="wrapper">
        <div className="logo">
          <img src='/images/logo.png' alt="logo" />
        </div>
        <div className="title">
          <p>Sign up Page!</p>
        </div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text" className="form-control" name="username" value={userInfo.username} onChange={handleChange} placeholder="Min. 3 characters length" required/>
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="email" className="form-control" name="email" id='userName' value={userInfo.email} onChange={handleChange} placeholder="Enter valid E-mail" required/>
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password" className="form-control" id='pwd' name="password" value={userInfo.password} onChange={handleChange} placeholder="Min. 6 characters length" required />
          </div>
          <button className="btn mt-3">Register</button>
        </form>
        <div className="text-center fs-6">
          <Link to="/login">Have an account? Login</Link>
        </div>
      </div>

    </div>
  )
}
