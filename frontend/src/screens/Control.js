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

  const handleDelete = async () => {

    if (window.confirm('Are you sure? Do you want to delete this blog?') === true) {
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ localStrInfo: localStorage.getItem('userEmail'), blogId: id })
      }

      const response = await fetch('https://blog-point-backend.onrender.com/api/deleteblog', options);
      const json = await response.json()
      if (!json.success) {
        alert('Blog not deleted, some error occur...')
        navigate(`/control/${id}`)
      } else if (json.success) {
        alert('Blog deleted successfully')
        navigate('/myblog')
      }
    }
  }

  const loadBlog = async () => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ localStrInfo: localStorage.getItem('userEmail'), blogId: id })
    }

    const response = await fetch('https://blog-point-backend.onrender.com/api/specificBlog', options);
    const json = await response.json()
    if (!json.success) {
      alert('Oops! error loading the Blog...')
      navigate('/myblog')
    } else if (json.success) {
      setBlogData(json.blogIdData)
    }
  }

  useEffect(() => {
    loadBlog()
  })
  return (
    <div>
      <Navbar />
      <div className='big-img'>
        <img src={imgUrl + blogData.contentType} alt="composeImg" />
      </div>
      <div className='content-on-image'>
        <h1>Wanna make changes!</h1>
        <p>Then, Edit / Delete your blog by your own.</p>
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
          <div className="para-content px-4 pb-5">
            <p>{blogData.content}</p>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button onClick={() => { navigate('/update/' + id) }} className='py-2 px-5' type="submit"><span><i class="fas fa-pen"></i></span> Edit</button>
          <button onClick={handleDelete}  className='py-2 px-5' type="submit"><span><i class="fas fa-trash"></i></span> Delete</button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
