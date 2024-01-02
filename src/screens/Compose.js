import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import categories from '../components/SelectOption'

export default function Compose() {
  const [postInfo, setPostInfo] = useState({postName:"", postTitle:"", postContent:""})
  const [postCategory, setPostCategory] = useState()  //Separate state for Select field

  let navigate = useNavigate();
  
  const handleSubmit = async(e)=> {
    e.preventDefault();
    console.log(JSON.stringify({postName:postInfo.postName, postCategory:postCategory, postTitle:postInfo.postTitle, postContent:postInfo.postContent, loggedInUserEmail:localStorage.getItem('userEmail')}));

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(
        {postName:postInfo.postName, postCategory:postCategory, postTitle:postInfo.postTitle, postContent:postInfo.postContent, loggedInUserEmail:localStorage.getItem('userEmail')}
      ),
    }
    const response = await fetch("http://localhost:8000/api/composeblog", options)
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert('Follow Blog Rules !\n Name length : min 3 characters\n Title length : min 3 characters\nContent length : min 50 characters')
    }
    else{
      navigate('/') //On successful login navigate to Home page
    }
  }

  //On-change input value event for Select fields
  function handleSelect(e){
    setPostCategory(e.name)
    console.log(postCategory);
  }
  //On-change input value event for other fields
  function handleChange(e) {
    const { name, value } = e.target
    setPostInfo((prevValue) => {
      console.log(prevValue);
      return ({...prevValue, [name]:value})
    })
  }

  return (
    <div>
      <Navbar />

      <div className='big-img'>
        <img src="/images/compose.jpg" alt="composeImg" />
      </div>

      <div className='content-on-image'>
        <h1>Compose your own Blog !</h1>
        <p>Write a suitable blog through which you can express your thoughs & views.</p>
      </div>

      <div className='content-below-image-without-text px-4 fw-bold'>
        <form onSubmit={handleSubmit} className="px-4" >
          <div className='row'>
            <div className="col p-2 mx-4 w-50">
              <label>Enter your name : </label>
              <input type="text" name="postName" value={postInfo.postName} onChange={handleChange} className="form-control" placeholder="Min 3 characters length" required />
            </div>
            <div className="col p-2 mx-4 w-50">
              <label>Enter post type : </label>
              <Select options={categories} 
                placeholder='Select Blog Category'
                default={postCategory}
                onChange={handleSelect}
                
                isSearchable 
                noOptionsMessage={()=>'Not found'} 
                // isMulti isDisabled
                styles={{
                  //Here styling is diff. because it is external module
                  placeholder : (baseStyles, state)=>({
                    ...baseStyles,
                    fontWeight : "normal"
                  }),
                  dropdownIndicator : (baseStyles, state)=>({
                    ...baseStyles,
                    color : "blue"
                  })
                }}
                />
            </div>
          </div>

          <div className="row mx-4 py-3">
            <label>Enter blog title : </label>
            <input type="text" name="postTitle" value={postInfo.postTitle} onChange={handleChange} className="form-control" placeholder="Min 5 characters length" required />
          </div>

          <div className="row mx-4 py-3">
            <label>Enter blog post content : </label>
            <textarea name="postContent" rows="8" cols="20" className="form-control" placeholder="Min 50 characters length"
            value={postInfo.postContent} onChange={handleChange} required></textarea>
          </div>

          <div className="p-2 d-flex justify-content-center">
            <button type="submit">Publish</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
