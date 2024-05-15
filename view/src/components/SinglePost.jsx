import React, { useState, useRef } from "react"
// import { PostContext } from "../pages/Posts"
// import CommentOfPost from "./CommentOfPost"
import {Link} from 'react-router-dom'
import Comments from "../pages/Comments"

function SinglePost(props) {

    // const { postsList, setPostsList } = useContext(PostContext)
    const [displayUpdate, setDisplayUpdate] = useState(false)
    const [post, setPost] = useState(props.post)
    const [showDetails, setShowDetails] = useState(false)

    function deletePost(id) {
        fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json)
            .then(data => {
               
                if (data) {
                    props.setPostsList(prev => prev.filter(post => post.id != id))
                    props.setPostsSource(props.postsList)
                }
                else {
                    alert("There is no such post to delete")
                }
            })
            .catch(error => console.error("Error fetching data from server:", error))
    }

    return (
        <div>
            <h4>id: {post.id}</h4>
            <input type="text" value={post.title} onChange={(e) => {
                setPost({ ...post, title: e.target.value })
                setDisplayUpdate(true)

            }} />

            {displayUpdate && <button onClick={() => update(post)}>update</button>}
            <button onClick={() => deletePost(post.id)}>delete</button>
            <button onClick={() => setShowDetails(true)}>show details</button>
            <button><Link to={`${post.id}/comments`}>show comments</Link></button>

            {showDetails &&
                <div>
                    <h2 className="detailedTitle">title: {post.title}</h2>
                    <p className="detailedBody">body: {post.body}</p>
                    <button onClick={() => setShowDetails(false)}>close</button>
                </div>}
            {/* 
                {showComments && <button onClick={() => setShowComments(false)}>close</button>}
                <div>
                    <Comments comments={post.comments} setPost={setPost}/>
                    {post.comments.map((comment) =>
                        <CommentOfPost key={comment.id} comment={comment} setPost={setPost} />
                    )}
                </div>} */}

        </div>
    )
}

export default SinglePost
