import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <div>
      <Navbar />
      
      <div className='big-img'>
        <img src="/images/contact.jpg" alt="composeImg"/>
      </div>

      <div className="content-on-image">
        <h1>Get in touch !</h1>
        <p>Want to know about our upcoming daily blogs ? Fill out the form below to get subscribed to our g-mail service</p>
      </div>

      <div className="content-below-image p-5">
        <form method="post" action="/contact">
          <div className='col'>
            <div className="card p-3 bg-dark">
              <div className="card p-5">
                <h1 className="h3 mb-3 ">Subsctribe to our Blog!</h1>
                <div className="mb-3">
                  <input type="text" name="firstname" className="p-2 col-sm-3" placeholder="First name" required autofocus/>
                </div>
                <div className="mb-3">
                  <input type="text" name="lastname" className="p-2 col-sm-3" placeholder="Last name" required/>
                </div>
                <div className="mb-3">
                  <input type="email" name="email" className="p-2 col-sm-3" placeholder="Email" required/>
                </div>
                <div className="mb-3">
                  <button className="p-3 mt-2 col-sm-3" type="submit">Sign up</button>
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
