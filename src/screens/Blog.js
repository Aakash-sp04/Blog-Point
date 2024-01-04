import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useParams, useNavigate } from 'react-router-dom'

export default function Post() {
  const idParam = useParams()
  const { id } = idParam  //ID of particular blog we get from Home Page
  // console.log(id);

  const navigate = useNavigate()
  const imgUrl = 'https://source.unsplash.com/random/900x700?'

  const [blogData, setBlogData] = useState('')
  const loadBlog = async () => {
    // console.log(JSON.stringify({ blogId: id }));
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ blogId: id })
    }
    const response = await fetch('http://localhost:8000/api/specificBlog', options);
    const json = await response.json()
    console.log(json.blogIdData);

    if (!json.success) {
      alert('Oops! error loading the Blog...')
      navigate('/')
    }
    else {
      setBlogData(json.blogIdData)
    }
  }

  const handleUserLike = async (id) => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ localStrInfo: localStorage.getItem('userEmail'), blogId: id })
    }
    const response = await fetch('http://localhost:8000/api/likeblog', options);
    const json = await response.json()
    // console.log(json);

    if (!json.success) {
      alert('Login Required !')
      navigate('/login')
    } else {
      setBlogData(json.updateBlog)
    }
  }

  const handleUserUnlike = async (id) => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ localStrInfo: localStorage.getItem('userEmail'), blogId: id })
    }
    const response = await fetch('http://localhost:8000/api/unlikeblog', options);
    const json = await response.json()
    // console.log(json);

    if (!json.success) {
      alert('Login Required !')
      navigate('/login')
    } else {
      setBlogData(json.updateBlog)
    }
  }

  useEffect(() => {
    loadBlog()
  }, [])
  return (
    <div>
      <Navbar />
      <div className='big-img'>
        <img src={imgUrl + blogData.contentType} alt="composeImg" />
      </div>

      <div className='content-on-image'>
        <h1>Like & comment</h1>
        <p>Please share your thoughs & views on Blogs</p>
      </div>

      <div className='content-below-image-without-text'>
        <div className='container-fluid'>
          <div className="m-5 d-flex justify-content-center">
            <h1>{blogData.title}</h1>
          </div>
          <div className="row m-3">
            <div className="col-6 d-flex justify-content-start">
              <p><em>on {blogData.date}</em></p>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <p><em>by {blogData.name}</em></p>
            </div>
          </div>
          <div className='para-content px-4 pb-5'>
            <p>{blogData.content}</p>
          </div>
        </div>

        <div className=''>
          <h5 style={{fontFamily: 'italic', letterSpacing: 3, fontWeight: 'bolder'}}>{blogData.likes === undefined ? 0 : blogData.likes.length} Likes</h5>
          {blogData?.likes?.includes(localStorage.getItem('userEmail'))
            ?
            <i className="material-icons unlike"
            onClick={() => { handleUserUnlike(blogData._id) }}>thumb_down</i>
            :
            <i className="material-icons like"
              onClick={() => { handleUserLike(blogData._id) }}>thumb_up</i>
          }
        </div>
      </div>

      <Footer />
    </div>
  )
}
