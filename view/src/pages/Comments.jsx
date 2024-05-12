import React, { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import SingleComment from "../components/SingleComment.jsx"

function Comments() {

    const postParams = useParams()
    const [comments, setComments] = useState(null)
    const [newComment, setNewComment] = useState({ postId: postParams.id, id: "", name: "", email: "", body: "" })
    const [displayNewComment, setDisplayNewComment] = useState()

    function addComment(comment) {
        fetch('http://localhost:3000/comments', {
            method: "POST",
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setComments([...comments, data])
                }
            })
            .catch(error => console.error("Error fetching data from server:", error))
        setDisplayNewComment(false)
    }

    useEffect(() => {
        fetch(`http://localhost:3000/comments?postId=${postParams.id}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setComments(data)
                }
                else {
                    alert("There are no comments for this post.")
                }
            })
            .catch(error => console.error("Error fetching data from server:", error))
    }, [])

    return (
        <>
            <button className="newButton" onClick={() => {
                setDisplayNewComment(true)
                setNewComment({ postId: postParams.id, id: "", name: "", email: "", body: "" })
            }}>new comment</button>

            {displayNewComment && <div className="new">
                <label htmlFor="name">name</label>
                <input id="name" type="text" value={newComment.name} onChange={(e) => setNewComment({ ...newComment, name: e.target.value })} />

                <label htmlFor="email">email</label>
                <input id="email" type="text" value={newComment.email} onChange={(e) => setNewComment({ ...newComment, email: e.target.value })} />

                <label htmlFor="body">body</label>
                <input id="body" type="text" value={newComment.body} onChange={(e) => setNewComment({ ...newComment, body: e.target.value })} />

                <button onClick={() => addComment(newComment)}>add</button>
            </div>}


            {comments ? 
            <div className="gridItems">
            {comments.map((comment) =>
                <div key={comment.id} className="singleItem">
                    <SingleComment key={comment.id} comment={comment} setComments={setComments} />
                </div>
            )}</div> : <h2>Loading...</h2>}

            <button><Link to={`../posts`}>close</Link></button>
        </>
    )
}

export default Comments




