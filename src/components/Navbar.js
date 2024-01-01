import React from 'react'
import { NavLink, useNavigate} from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  
  return (
    <div>
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
          <div className="navbar-header">
            <p className="navbar-brand">BLOG POINT</p>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav fw-bold ms-auto">
              <li className="nav-item p-2" id="home">
                <NavLink className="nav-NavLink" to="/">HOME</NavLink>
              </li>

              {(!localStorage.getItem('authToken')) ? 
                <li className="nav-item p-2" id="auth">
                  <NavLink className="nav-NavLink" to="/register">SIGN UP</NavLink>
                </li>
                :
                <li className="nav-item p-2 font-weight-bold text-white" id="auth">
                  <div type='button' className="nav-NavLink" onClick={()=>{
                    localStorage.removeItem('authToken')
                    localStorage.removeItem('userEmail')
                    navigate('/login')
                  }}>LOGOUT</div>
                </li>
              }              

              <li className="nav-item p-2" id="about">
                <NavLink className="nav-NavLink" to="/about">ABOUT</NavLink>
              </li>
              
              <li className="nav-item p-2" id="composeBlog">
                <div type='button' className="nav-NavLink font-weight-bold text-white" onClick={()=>{
                    !localStorage.getItem('authToken') ?
                      navigate('/register') : navigate('/compose')
                }}>COMPOSE BLOG</div>
              </li>
              
              {!localStorage.getItem('authToken') ?
                <li className="nav-item p-2" id="contact">
                  <NavLink className="nav-NavLink" to="/contact">CONTACT</NavLink>
                </li>
                :
                <li className="nav-item p-2" id="composeBlog">
                  <NavLink className="nav-NavLink" to="/myblog">MY BLOGS</NavLink>
                </li>
              }
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
