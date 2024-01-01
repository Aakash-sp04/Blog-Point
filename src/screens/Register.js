import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

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
    const response = await fetch('http://localhost:8000/api/createuser', options)
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
    <div style={{backgroundImage: "url(/images/about.jpg)", backgroundSize: 'cover', height: '120vh' , paddingTop : '5%'}}>
      <Navbar />
      
      <div className="container">

        <div className="row d-flex justify-content-center">
          <div className="col-sm-8">
            <div className="card p-2 w-30 bg-dark">
              <div className="card p-5 w-30">

                <form onSubmit={handleSubmit}>
                  <div className="form-group px-3">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" value={userInfo.username} onChange={handleChange} placeholder="Min 3 characters length" required/>
                  </div>
                  <div className="form-group px-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" value={userInfo.email} onChange={handleChange} placeholder="Enter valid E-mail i.e. (John@gmail.com)" required/>
                  </div>
                  <div className="form-group px-3 py-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={userInfo.password} onChange={handleChange} placeholder="Min 6 characters length" required />
                  </div>
                  <div className="form-group px-3 py-2 d-flex justify-content-center">
                    <button type="submit" onSubmit={handleSubmit} className="px-4 py-2">Register</button>
                  </div>
                </form>

                <div className="divider d-flex align-items-center my-4 px-3">
                  <p className="text-center mx-3 mb-0">OR</p>
                </div>

                <div className="form-group px-3 d-flex justify-content-center">
                  <a className="btn btn-block btn-social btn-google py-2" href="http://localhost:8000/auth/google" role="button">
                    <i className="fab fa-google"></i>
                    Sign In with Google
                  </a>
                </div>

                <div className="form-group pt-3 d-flex justify-content-center">
                  Already have an account? <Link to="/login"> Login</Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
