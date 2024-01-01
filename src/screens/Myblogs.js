import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Myblogs() {
  const [blogData, setBlogData] = useState([])
  const imgUrl = 'https://source.unsplash.com/random/900x700?'
  const navigate = useNavigate()

  const loadMyBlogs = async () => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userEmail: localStorage.getItem('userEmail') })
    }
    const response = await fetch('http://localhost:8000/api/userblog', options);
    const json = await response.json()

    if (!json.success) {
      navigate('/*')
    } else if (!json.userBlogs) {
      navigate('/compose')
      setTimeout(()=>{  //To avoid alert call before useNavigate
        alert('You have not compose any blog till now...!')
      },500)
    } else if (json.userBlogs) {
      setBlogData(json.userBlogs)
    }
  }

  useEffect(() => {
    loadMyBlogs()
  }, [])
  return (
    <div>
      <Navbar />

      <div className='big-img'>
        <img src="/images/myblog.jpg" alt="composeImg" />
      </div>

      <div className='content-on-image'>
        <h1>Checkout your own Blog !</h1>
        <p>View, edit or delete your own blog according to your convenience.</p>
      </div>

      {/* In map second argument is iterator */}
      {blogData.map((data, i) => {
        if (i === 0) {
          return (
            <div style={{ marginTop: '500px', padding: '30px 0', fontFamily: 'Kanit' }}>
              <div className='col px-5'>
                <div className="card p-3 bg-dark">
                  <div className="card p-4">
                    <h2><i>Blogs by {data.name}</i></h2>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      })}

      <div className='container-fluid'>
        <div className='row px-5'>
          {
            blogData.map(data => {
              return (
                <div className='col-lg-3 col-md-4 col-sm-12 py-2'>
                  <Card
                    key={data._id}
                    name={data.name}
                    img={imgUrl + data.contentType}
                    alt={data.contentType}
                    title={data.title}
                    content={data.content.substr(0, 100)}
                    date={data.date}
                    blogLink={'/control/' + data._id}
                  />
                </div>
              )
            })
          }
        </div>
      </div>

      <Footer />
    </div>
  )
}