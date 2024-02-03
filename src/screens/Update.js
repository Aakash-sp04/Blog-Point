import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import categories from '../components/SelectOption'

export default function Compose() {
    const idParam = useParams()
    const { id } = idParam  //ID of particular blog we get from Home Page
    // console.log(id);
    
    const navigate = useNavigate();
    const [blogInfo, setBlogData] = useState({ blogName: "", blogTitle: "", blogContent: "" })
    const [blogCategory, setBlogCategory] = useState("")  //Separate state for Select field


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ blogId:id, blogName: blogInfo.blogName, blogCategory: blogCategory, blogTitle: blogInfo.blogTitle, blogContent: blogInfo.blogContent, loggedInUserEmail: localStorage.getItem('userEmail') }));

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(
                { blogId:id, blogName: blogInfo.blogName, blogCategory: blogCategory, blogTitle: blogInfo.blogTitle, blogContent: blogInfo.blogContent, loggedInUserEmail: localStorage.getItem('userEmail') }
            ),
        }
        const response = await fetch("http://localhost:8000/api/updateblog", options)
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert('Follow Blog Rules !\n Name length : min 3 characters\n Title length : min 3 characters\nContent length : min 50 characters')
        }
        else {
            alert('Blog updated successfully !')
            navigate(`/control/${id}`) //On successful login navigate to control page
        }
    }

    //On-change input value event for Select fields
    function handleSelect(e) {
        setBlogCategory(e.name)
        console.log(blogCategory);
    }
    //On-change input value event for other fields
    function handleChange(e) {
        const { name, value } = e.target
        setBlogData((prevValue) => {
            console.log(value);
            return ({ ...prevValue, [name]: value })
        })
    }

    const loadBlog = async () => {
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
            navigate('/myblog')
        } else if (json.success) {
            setBlogData({
                blogName: json.blogIdData.name, 
                blogTitle: json.blogIdData.title, 
                blogContent: json.blogIdData.content
            })
            // console.log(json.blogData)

            let search = json.blogIdData.contentType
            setBlogCategory(search.charAt(0).toUpperCase() + search.substr(1, search.length).toLowerCase())
            // console.log(search);
        }
    }
    useEffect(() => {
        loadBlog()
    },[])
    return (
        <div>
            <Navbar />

            <div className='big-img'>
                <img src="/images/compose.jpg" alt="composeImg" />
            </div>

            <div className='content-on-image'>
                <h1>Update your Blog !</h1>
                <p>Edit blog according to your convenience.</p>
            </div>

            <div className='content-below-image-without-text px-4 fw-bold'>
                <form onSubmit={handleSubmit} className="px-4" >
                    <div className='row'>
                        <div className="col p-2 mx-4 w-50">
                            <label>Enter your name : </label>
                            <input type="text" name="blogName" defaultValue={blogInfo.blogName} onChange={handleChange} className="form-control" placeholder="Min 3 characters length" required />
                        </div>
                        <div className="col p-2 mx-4 w-50">
                            <label>Select blog content-type : </label>
                            <Select options={categories}
                                placeholder='Select Blog Category'
                                defaultValue={blogCategory}
                                onChange={handleSelect}

                                isSearchable
                                noOptionsMessage={() => 'Not found'}
                                // isMulti isDisabled
                                styles={{
                                    //Here styling is diff. because it is external module
                                    placeholder: (baseStyles, state) => ({
                                        ...baseStyles,
                                        fontWeight: "normal"
                                    }),
                                    dropdownIndicator: (baseStyles, state) => ({
                                        ...baseStyles,
                                        color: "blue"
                                    })
                                }}
                            />
                        </div>
                    </div>

                    <div className="row mx-4 py-3">
                        <label>Blog content-type : </label>
                        <input type="text" name="blogTitle"  defaultValue={blogCategory} className="form-control" required />
                    </div>

                    <div className="row mx-4 py-3">
                        <label>Enter blog title : </label>
                        <input type="text" name="blogTitle" defaultValue={blogInfo.blogTitle} onChange={handleChange} className="form-control" placeholder="Min 5 characters length" required />
                    </div>

                    <div className="row mx-4 py-3">
                        <label>Enter blog post content : </label>
                        <textarea name="blogContent" rows="8" cols="20" className="form-control" placeholder="Min 50 characters length"
                            defaultValue={blogInfo.blogContent} onChange={handleChange} required />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="py-2 px-5">Update</button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}
