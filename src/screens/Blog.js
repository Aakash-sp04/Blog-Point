import React, { useEffect, useState, useRef } from 'react'
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
  const [likeActive, setLikeActive] = useState(false)
  // const myLikeRef = useRef(blogData.like);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const loadBlog = async () => {
    // console.log(JSON.stringify({ blogId: id }));
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ localStrInfo: localStorage.getItem('userEmail'), blogId: id })
    }
    const response = await fetch('http://localhost:8000/api/specificBlog', options);

    const json = await response.json()
    if (!json.success) {
      alert('Oops! error loading the Blog...')
      navigate('/')
    }
    else if (json.likeState) {
      setBlogData(json.blogIdData)
      setLikeActive(json.likeState)
    } else if (!json.likeState) {
      setBlogData(json.blogIdData)
    }
  }

  const handleLike = async () => {
    setLikeActive(curr => !curr);
    console.log(likeActive);

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ localStrInfo: localStorage.getItem('userEmail'), blogId: id, likeState: likeActive })
    }
    const response = await fetch('http://localhost:8000/api/likeblog', options);
    const json = await response.json()

    if (json.msg) {
      console.log(json.msg);
      alert('Login Required !')
      navigate('/login')
    }
    else if (json.success) {
      setBlogData(json.blogIdData)
      console.log(json.blogIdData)
    } else if (!json.success) {
      console.log(json);
    }
  }

  useEffect(() => {
    if (isInitialRender) {
      loadBlog()
      setIsInitialRender(false)
    } else {
      console.log(likeActive);
      console.log(blogData);
    }
  }, [isInitialRender, likeActive, blogData])
  // useEffect(() => {
  //   if (isInitialRender) {
  //     // Add your initial render code here
  //     loadBlog()
  //     // Update the flag to indicate that the initial render is done
  //     setIsInitialRender(false);
  //   } else {
  //     console.log('myState has changed:', likeActive);

  //     // Add your code that should run on every state change here
  //   }
  // }, [isInitialRender, likeActive, blogData]);
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

        <div>
          <button 
            onClick={handleLike}>
            Like {blogData.like}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
