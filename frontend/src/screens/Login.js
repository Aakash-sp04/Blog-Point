import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import BASE_URL from '../endpoint'

export default function Login() {
  //Maintaining state for user-register info
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" })

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({email: loginInfo.email, password: loginInfo.password}));

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(
        { email: loginInfo.email, password: loginInfo.password }
      ),
    }
    const response = await fetch(`${BASE_URL}/api/loginuser`, options)
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert('Enter valid e-mail or password')
    }
    if (json.success) {
      localStorage.setItem('userEmail', loginInfo.email)
      localStorage.setItem('authToken', json.authToken)
      // console.log(localStorage.getItem('authToken'));
      navigate('/') //On successful login navigate to Home page
    }
  }

  //On-change input value event
  function handleChange(e) {
    const { name, value } = e.target
    setLoginInfo((prevValue) => {
      return ({ ...prevValue, [name]: value })
    })
  }

  return (
    <div style={{ backgroundImage: "url(/images/login1.avif)", backgroundSize: '100% 100%', height: '120vh', paddingTop: '7%' }}>
      <Navbar />

      <div className="wrapper">
        <div className="logo">
          <img src='/images/logo.png' alt="logo" />
        </div>
        <div className="title">
          <p>Login Page!</p>
        </div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text" name="email" id="userName" value={loginInfo.email} placeholder="E-mail" onChange={handleChange} required />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password" name="password" id="pwd" value={loginInfo.password} placeholder="Password" onChange={handleChange} required />
          </div>
          <button className="btn mt-3">Login</button>
        </form>
        <div className="text-center fs-6">
          <Link to="/forget-password">Forget Password?</Link> or <Link to="/register">Sign up</Link>
        </div>
      </div>

    </div>
  )
}
