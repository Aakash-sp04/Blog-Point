import React from 'react'

export default function Comment(props) {
    const commentStyle = {
        backgroundColor: "#f7f0f5",
        margin: "0 7%",
        padding: "2% 0 0 0",
        borderRadius: "15px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "grey",
    }
    return (
        <div className='d-flex flex-column my-3' style={commentStyle}>
            <div className='d-flex flex-row justify-content-between pb-2'>
                <small className='px-5'><i>{props.name}</i></small>
                <small className='px-5'><i>{props.date}</i></small>
            </div>
            <p className='fs-6'>
                {props.content}
            </p>
        </div>
    )
}
