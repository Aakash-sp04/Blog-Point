import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate()
  return (
        <div className="container">
          <div className="justify-content-center">
            <div className="text-center">
              <span className="display-3 d-block">Error 404 : Page not found!</span>
              <div className="mb-4 lead">Sorry, your request could not be processed.</div>
              <button onClick={()=>{navigate('/')}} className='py-2' >Back to Home</button>
            </div>
          </div>
        </div>
  )
}
