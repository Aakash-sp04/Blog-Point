import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Comment from './components/Comment'
import BASE_URL from './endpoint'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '75%',
    borderRadius: '5px',
    backgroundColor: '#fff',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height: '100%',
    width: '50%',
    overflowY: "scroll"
}
const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000,
}

export default function Modal({ onClose, blogData, setCommentCount }) {
    const navigate = useNavigate();
    const [newComment, setNewComment] = useState("");
    const [commentArray, setCommentArray] = useState(blogData.comments)

    const handleClick = async () => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ blogId: blogData._id, newComment: newComment, commenter: localStorage.getItem('userEmail') })
        }
        const response = await fetch(`${BASE_URL}/api/commentblog`, options);
        const json = await response.json()

        if (!json.success) {
            if (json.msg === "emptyComment") {
                alert('Empty comment cannot be added !')
            } else {
                alert('Login Required !')
                navigate('/login')
            }
        }
        else {
            setCommentCount(json.updateBlog);
            setCommentArray([...commentArray, json.recentAddedComment])
            setNewComment("")
            alert('Comment Added !')
        }
    }

    return (
        <>
            <div style={OVERLAY_STYLES} />    {/*Outer i.e. background style*/}
            <div style={MODAL_STYLES}>        {/*Upper style*/}

                <button className='btn p-0 mt-3 mx-5 bg-black text-white d-flex' onClick={onClose}> 
                    <i className="material-icons">reply</i>
                </button>
                <div className='d-flex flex-column'>
                    <h4 className='mt-3 fw-bold d-flex mx-5'>Comments</h4>
                    <textarea className="border-5 mx-5 mt-3 p-2" name='newComment' value={newComment}
                        onChange={(e) => { setNewComment(e.target.value) }}
                        style={{ backgroundColor: "#f7f0f5", width: '70%', borderRadius: "5px" }} placeholder='Leave a comment...' rows="7"></textarea>
                    <button className='mx-5 my-3 p-2' style={{ width: "100px" }} onClick={handleClick}>Comment</button>
                </div>

                <div>
                    {commentArray.length > 0 ?
                        commentArray.map((ele) => {
                            return (
                                <Comment
                                    name={ele.commenter.substring(0, ele.commenter.indexOf('@'))}
                                    date={ele.date}
                                    content={ele.content}
                                />
                            )
                        })
                        :
                        <div className='mx-5 py-1 text-secondary' style={{ backgroundColor: "#f7f0f5", width: '70%', borderRadius: "20px" }}>
                            No comments
                        </div>
                    }
                </div>
            </div>
        </>
    )
}