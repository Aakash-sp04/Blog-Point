import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-3 d-block">Error 404 : Page not found!</span>
              <div className="mb-4 lead">Sorry, your request could not be processed.</div>
              <Link to="/" className="btn btn-link">Back to Home</Link>
            </div>
          </div>
        </div>
    </div>
  )
}
