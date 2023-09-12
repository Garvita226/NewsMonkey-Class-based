import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, author, date, source} = this.props
        return (
            <div>
                <div className="card my-3">
                    <span className="d-flex justify-content-end position-absolute end-0 badge rounded-pill bg-danger" >
                       {source}</span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={url} target='_blank' rel="noreferrer" className="btn btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
