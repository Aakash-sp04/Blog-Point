import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from '../components/Navbar'

function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const { id, token } = useParams()

    const handleSubmit = async(e) => {
        e.preventDefault()
        // console.log(JSON.stringify({email: email}));

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(
                { password: password }
            ),
        }
        const response = await fetch(`http://localhost:8000/api/resetPasswordUser/${id}/${token}`, options)
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert('Enter correct password!')
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
            <input type="password" name="password" id="pwd" placeholder="Enter new Password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn mt-3">Update Password</button>
        </form>
        <div className="text-center fs-6">
          <Link to="/login">Back to login?</Link> or <Link to="/register">Sign up</Link>
        </div>
      </div>

    </div>
    )
}

export default ResetPassword;
