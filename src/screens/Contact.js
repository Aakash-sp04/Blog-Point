import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'

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
    const response = await fetch("http://localhost:8000/api/contactPage", options)
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
    <div>
      <Navbar />

      <div className='big-img'>
        <img src="/images/contact.jpg" alt="composeImg" />
      </div>

      <div className="content-on-image">
        <h1>Get in touch !</h1>
        <p>Want to know about our upcoming daily blogs ? Fill out the form below to get subscribed to our g-mail service</p>
      </div>

      <div className="content-below-image-without-text px-4">
        <form onSubmit={handleSubmit}>
          <div className='col'>
            <div className="card p-3 bg-dark">
              <div className="card p-5">
                <h1 className="h3 mb-3">Subsctribe to our Blog!</h1>
                <div className="mb-3">
                  <input type="text" name="firstname" value={contactInfo.firstname} className="p-2 col-sm-3" onChange={handleChange} placeholder="First name" required autofocus />
                </div>
                <div className="mb-3">
                  <input type="text" name="lastname" value={contactInfo.lastname} className="p-2 col-sm-3" onChange={handleChange} placeholder="Last name" required />
                </div>
                <div className="mb-3">
                  <input type="email" name="email" value={contactInfo.email} className="p-2 col-sm-3" onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="mb-3">
                  <button type="submit" className="p-3 mt-2 col-sm-3">Sign up</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
