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
    const response = await fetch("http://localhost:8000/api/forgetPasswordUser", options)
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
    <div style={{ backgroundImage: "url(/images/about.jpg)", backgroundSize: 'cover', height: '110vh', paddingTop: '7%' }}>
      <Navbar />

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-8">
            <div className="card p-2 w-30 bg-dark">
              <div className="card p-5 w-30">
                <form onSubmit={handleSubmit}>
                  <div className="form-group px-3 pb-2">
                    <label htmlFor="email">Registered E-mail</label>
                    <input type="email" placeholder="Enter registered e-mail" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="form-group py-3 d-flex justify-content-center">
                    <button type="submit" className='px-4 py-2'>Send Reset Link</button>
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
