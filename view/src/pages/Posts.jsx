import React, { useState, useEffect, useContext } from "react"
import { AppContext } from "../App.jsx"
import SinglePost from "../components/SinglePost.jsx"

function Posts() {
  const { user, setUser } = useContext(AppContext)
  const [postsList, setPostsList] = useState([])
  const [postsSource, setPostsSource] = useState([])
  const [searchChoosen, setSearchChoosen] = useState("")
  const [searchType, setSearchType] = useState("")
  const [displayNewPost, setDisplayNewPost] = useState(false)
  const [newPost, setNewPost] = useState({ userId: user.userId, id: "", title: "", body: "" })

  function addPost(post) {
    fetch('http://localhost:3000/posts', {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setPostsList([...postsList, data])
          setPostsSource(postsList)
        } else {
          alert("There are no posts for this user")
        }
      })
      .catch(error => console.error("Error fetching data from server:", error))
    setDisplayNewPost(false)
  }

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${user.userId}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setPostsList(data)
          setPostsSource(data)
        }
        else {
          alert("There are no posts for this user")
        }
      })
      .catch(error => console.error("Error fetching data from server:", error))
  }, [])

  useEffect(() => {
    switch (searchType) {
      case "SelectAll":
        setPostsList(postsSource)
        break
      case "Id":
        setPostsList(postsSource.filter((post) => post.id == searchChoosen))
        break
      case "Title":
        setPostsList(postsSource.filter((post) => post.title.includes(searchChoosen)))
        break
    }
  }, [searchChoosen])

  return (
    <>
      <label htmlFor="search">Search by criteria</label><br />
      <select id="search" onChange={(e) => {
        setSearchChoosen("")
        setPostsList(postsSource)
        setSearchType(e.target.value)
      }}>
        <option value="SelectAll">select all</option>
        <option value="Id">Id</option>
        <option value="Title">Title</option>
      </select>
      <input type="text" value={searchChoosen} placeholder="enter your choosen" onChange={(e) => setSearchChoosen(e.target.value)} />
      <br />

      <button className="newButton" onClick={() => {
        setDisplayNewPost(true)
        setNewPost({ userId: user.userId, id: "", title: "", body: "" })
      }}>new post</button>

      {displayNewPost &&
        <div className="new">
          <label htmlFor="title">title</label>
          <input id="title" type="text" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
          <label htmlFor="body">body</label>
          <input id="body" type="text" value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} />
          <button onClick={() => addPost(newPost)}>add</button>
        </div>}


      {postsList ?
        <div className="gridItems">
          {postsList.map((post) =>
            <div key={post.id} className="singleItem">
              <SinglePost post={post} postsList={postsList} setPostsList={setPostsList} setPostsSource={setPostsSource} />          
            </div>
          )}</div> : <h2>Loading...</h2>}
    </>
  )
}

export default Posts