import React from 'react'
import { Link } from 'react-router-dom'

export default function Cards(props) {
    return (

        <div className='card card-shadow'>
            <div className="card-header bg-dark text-white fst-italic">
                ~by {props.name}
            </div>
            <div className="card-body">
                <img src={props.img} className="card-img-top" alt={props.alt} style={{objectFit: "fill" }} />
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.content}...</p>
                <Link to={props.blogLink} className="btn btn-dark px-4 py-2">Read more</Link>
            </div>
            <div className="card-footer text-muted fst-italic">
                posted on {props.date}
            </div>
        </div>

    )
}
