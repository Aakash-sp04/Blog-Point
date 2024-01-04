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
        <div style={{ backgroundImage: "url(/images/about.jpg)", backgroundSize: 'cover', height: '110vh', paddingTop: '7%' }}>
      <Navbar />

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-8">
            <div className="card p-2 w-30 bg-dark">
              <div className="card p-5 w-30">
                <form onSubmit={handleSubmit}>
                  <div className="form-group px-3 pb-2">
                    <label htmlFor="password">New Password</label>
                    <input type="password" placeholder="Enter new password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <div className="form-group py-3 d-flex justify-content-center">
                    <button type="submit" className='px-4 py-2'>Update Password</button>
                  </div>
                </form>

                <div className="divider d-flex align-items-center my-3 px-3">
                  <p className="text-center mx-2 mb-0">OR</p>
                </div>
                <div className="form-group pt-3 d-flex justify-content-center">
                  Back to login?<Link to="/login"> Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    )
}

export default ResetPassword;
