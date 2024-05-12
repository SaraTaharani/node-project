import React, { useState } from "react"

function SingleComment(props) {
  const [comment, setComment] = useState(props.comment)
  const [displayUpdate, setDisplayUpdate] = useState(false)

  function deleteComment(id) {
    fetch(`http://localhost:3000/comments/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json)
    .then(data => {
      if (data) {
        props.setComments((prev) => (prev.filter(comment => comment.id != id) ))
      }
    })
    .catch(error => console.error("Error fetching data from server:", error))

  }

  function update(comment) {
    fetch(`http://localhost:3000/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        .then(res => res.json)
        .then(data => {
            if (data) {
                props.setComments(prev => prev.map(cm => cm.id == comment.id ? comment : cm))
            }      
        })
        .catch(error => console.error("Error fetching data from server:", error))
    setDisplayUpdate(false)
}

  return (
    <div>
      <h4>id:{comment.id}</h4>
      <input type="text" value={comment.name} onChange={(e) => {
        setComment({ ...comment, title: e.target.value })
        setDisplayUpdate(true)

      }} />
      <input type="text" value={comment.email} onChange={(e) => {
        setComment({ ...comment, email: e.target.value })
        setDisplayUpdate(true)

      }} />
      <input type="text" value={comment.body} onChange={(e) => {
        setComment({ ...comment, body: e.target.value })
        setDisplayUpdate(true)

      }} />
      {displayUpdate && <button onClick={() => update(comment)}>update</button>}
      <button onClick={() => deleteComment(comment.id)}>delete</button>
    </div>
  )
}

export default SingleComment
