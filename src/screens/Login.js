import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  //Maintaining state for user-register info
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" })

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({email: loginInfo.email, password: loginInfo.password}));

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(
        { email: loginInfo.email, password: loginInfo.password }
      ),
    }
    const response = await fetch("http://localhost:8000/api/loginuser", options)
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert('Enter valid e-mail or password')
    }
    if (json.success) {
      localStorage.setItem('userEmail', loginInfo.email)
      localStorage.setItem('authToken', json.authToken)
      console.log(localStorage.getItem('authToken'));
      navigate('/') //On successful login navigate to Home page
    }
  }

  //On-change input value event
  function handleChange(e) {
    const { name, value } = e.target
    setLoginInfo((prevValue) => {
      return ({...prevValue, [name]:value})
    })
  }

  return (
    <div style={{ backgroundImage: "url(/images/about.jpg)", backgroundSize: 'cover', height: '120vh', paddingTop: '5%' }}>
      <Navbar />

      <div className="container">

        <div className="row d-flex justify-content-center">
          <div className="col-sm-8">
            <div className="card p-2 w-30 bg-dark">
              <div className="card p-5 w-30">

                <form onSubmit={handleSubmit}>
                  <div className="form-group px-3">
                    <label htmlFor="username">E-mail</label>
                    <input type="text" className="form-control" name="email" value={loginInfo.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group px-3 py-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={loginInfo.password} onChange={handleChange} required />
                  </div>
                  <div className="form-group px-3 py-2 d-flex justify-content-center">
                    <button type="submit" className="px-4 py-2">Login</button>
                  </div>
                </form>

                <div className="divider d-flex align-items-center my-4 px-3">
                  <p className="text-center mx-3 mb-0">OR</p>
                </div>
                
                <div className="form-group px-3 d-flex justify-content-center">
                  <a className="btn btn-block btn-social btn-google py-2" href="http://localhost:8000/auth/google" role="button">
                    <i className="fab fa-google"></i>
                    Login with Google
                  </a>
                </div>

                <div className="form-group pt-3 d-flex justify-content-center">
                  Don't have an account? <Link to="/register"> Register</Link>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}