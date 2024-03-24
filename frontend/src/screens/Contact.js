import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import BASE_URL from '../endpoint'

export default function Contact() {

  const [contactInfo, setContactInfo] = useState({ firstname: "", lastname: "", email: "" })
  const handleSubmit = async (e) => {
    e.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(
        { firstname: contactInfo.firstname, lastname: contactInfo.lastname, email: contactInfo.email }
      )
    }
    const response = await fetch(`${BASE_URL}/api/contactPage`, options)
    const json = await response.json()
    // console.log(json);

    if (!json.success) {
      alert('Fail to subscribe !!!\nFollow conventions !\nName length : min 3 characters!\nWrite a valid email!')
    }
    else {
      alert('Subscribe successfully !!!')
      setContactInfo({
        firstname: "",
        lastname: "",
        email: ""
      })
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setContactInfo((prevVal) => {
      return ({ ...prevVal, [name]: value })
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
          <p>Subscribe to our Blog Site!</p>
        </div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text" name="firstname" value={contactInfo.firstname} className="p-2 col-sm-3" onChange={handleChange} placeholder="First name" required autofocus />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text" name="lastname" value={contactInfo.lastname} className="p-2 col-sm-3" onChange={handleChange} placeholder="Last name" required />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="email" name="email" value={contactInfo.email} className="p-2 col-sm-3" onChange={handleChange} placeholder="Email" required />
          </div>
          <button className="btn mt-3">Subscribe</button>
        </form>
      </div>

      <Footer />
    </div>
  )
}
