import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({email: email}));

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(
        { email : email }
      ),
    }
    const response = await fetch("https://blog-point-backend.onrender.com/api/forgetPasswordUser", options)
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert('Password reset failed!')
    }
    if (json.success) {
      navigate('/login') //On successful navigate to login page
    }
  }

  return (
    <div style={{ backgroundImage: "url(/images/login1.avif)", backgroundSize: '100% 100%', height: '100vh', paddingTop: '7%' }}>
      <Navbar />

      <div className="wrapper">
        <div className="logo">
          <img src='/images/logo.png' alt="logo" />
        </div>
        <div className="title">
          <p>Reset Password Page!</p>
        </div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="email" placeholder="Enter registered E-mail" id='userName' name="email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button className="btn mt-3">Send Reset Link</button>
        </form>
        <div className="text-center fs-6">
          <Link to="/login">Back to login?</Link> or <Link to="/register">Sign up</Link>
        </div>
      </div>

    </div>
  )
}
