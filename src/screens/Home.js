import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Select from 'react-select'
import categories from '../components/SelectOptionAll'
import Card from '../components/Card'

export default function Home() {
  const [search, setSearch] = useState('all')
  const [blogData, setBlogData] = useState([])
  const imgUrl = 'https://source.unsplash.com/random/900x700?'

  const loadHomePage = async () => {
    // console.log(JSON.stringify({ contentType: search }));
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contentType: search })
    }
    const response = await fetch('http://localhost:8000/api/blogdata', options);

    const json = await response.json()
    if (!json.success) {
      alert('No blog for given category found...')
      setBlogData([])
      // console.log(json)
      // console.log(blogData)
    }

    if (json.success) {
      //Storing post data to postData state 
      setBlogData(json.filterPosts)
      // console.log(json);
      // console.log(blogData);
    }
  }

  function handleSearch(e) {
    setSearch(e.name)
  }

  //So, to make useEffect function called only for change in search state
  //and not for each render we here, specify search in dependency array
  useEffect(() => {
    loadHomePage()
  }, [search])
  return (
    <div>
      <Navbar />

      <div className='big-img'>
        <img src="/images/home.jpg" alt="composeImg" />
      </div>
      <div className="content-on-image">
        <h1>Welcome to my Blog site !</h1>
        <p>A Proactive blog site where you find content that always enrich your knowledge & take you forward</p>

        {/* Search bar */}
        <div className="p-5 d-flex justify-content-center">
          <span className="input-group-text bg-dark bg-gradient" >
            <i className="fas fa-search" style={{ color: 'white' }} ></i>
          </span>
          <Select options={categories}
            placeholder='Select Blog Category'
            default={search}
            onChange={handleSearch}
            isSearchable
            noOptionsMessage={() => 'Not found'}
            styles={{
              //Here styling is diff. because it is external module
              placeholder: (baseStyles, state) => ({
                ...baseStyles,
                fontWeight: "normal"
              }),
              dropdownIndicator: (baseStyles, state) => ({
                ...baseStyles,
                color: "black"
              })
            }}
          />
        </div>
      </div>

      <div className="content-below-image pb-5">
        <div className='col px-5'>
          <div className="card p-3 bg-dark">
            <div className="card p-4">
              <h1>{search.charAt(0).toUpperCase() + search.substr(1, search.length).toLowerCase()} Blogs</h1>
            </div>
          </div>
        </div>
      </div>

      <div className='container-fluid'>
        <div className='row px-5'>
          {
            blogData != [] ?
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
                      blogLink={'/blog/' + data._id} 
                    />
                  </div>
                )
              })
              :
              <div>
                <h1>Blog not found for {search}</h1>
              </div>
          }
        </div>
      </div>

      <Footer />
    </div>
  )
}