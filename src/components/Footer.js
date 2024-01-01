import React from 'react'

export default function Footer() {
  return (
    <>
      
      <div className="container-fluid" id="foot">
        <div className="footer">

          <a className="footer-link" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
          <a className="footer-link" href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
          <a className="footer-link" href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
          <a className="footer-link" href="https://www.gmail.com/"><i className="fas fa-envelope"></i></a>
          <p>&copy; Copyright by Blog Point {new Date().getFullYear()}</p>
        </div>
      </div>

    </>
  )
}
