import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../App.jsx"
import SingleAlbum from "../components/SingleAlbum.jsx"

function Albums() {

  const { user } = useContext(AppContext)
  const [albumsList, setAlbumsList] = useState([])
  const [albumsSource, setAlbumsSource] = useState([])
  const [searchChoosen, setSearchChoosen] = useState("")
  const [searchType, setSearchType] = useState("")
  const [displayNewAlbum, setDisplayNewAlbum] = useState(false)
  const [newAlbum, setNewAlbum] = useState({ userId: user.id, id: "", title: "" })

  function addAlbum(album) {
    fetch('http://localhost:3000/albums', {
      method: "POST",
      body: JSON.stringify(album),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setAlbumsList([...albumsList, data])
          setAlbumsSource(albumsList)
        } else {
          alert("There are no albums for this user")
        }
      })
      .catch(error => console.error("Error fetching data from server:", error))
    setDisplayNewAlbum(false)
  }

  useEffect(() => {
    fetch(`http://localhost:3000/albums?&userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setAlbumsList(data)
          setAlbumsSource(data)
        }
        else {
          alert("There are no albums for this user")
        }
      })
      .catch(error => console.error("Error fetching data from server:", error))
  }, [])

  useEffect(() => {

    switch (searchType) {
      case "selectAll":
        setAlbumsList(albumsSource)
        break
      case "Id":
        setAlbumsList(albumsSource.filter((album) => album.id == searchChoosen))
        break
      case "Title":
        setAlbumsList(albumsSource.filter((album) => album.title.includes(searchChoosen)))
        break
    }
  }, [searchChoosen])

  return (
    <>
      <label htmlFor="search">Search by criteria</label><br />
      <select id="search" onChange={(e) => {
        setSearchChoosen("")
        setSearchType(e.target.value)
      }}>
        <option value="selectAll">select all</option>
        <option value="Id">Id</option>
        <option value="Title">Title</option>
      </select>
      <input type="text" placeholder="enter your choosen" onChange={(e) => setSearchChoosen(e.target.value)} />
      <br />
      
    <button className="newButton" onClick={() => {
      setDisplayNewAlbum(true)
      setNewAlbum({ userId: user.id, id: "", title: "" })
    }}>new album</button>
  
    {displayNewAlbum &&
      <div className="new">
        <label htmlFor="title">title</label>
        <input id="title" type="text" value={newAlbum.title} onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })} />
        <button onClick={() => addAlbum(newAlbum)}>add</button>
      </div>}
      

      {albumsList ? 
      <div className="gridItems">
      {albumsList.map((album) =>
        <div key={album.id} className="singleItem">
          <SingleAlbum album={album} albumsList={albumsList} setAlbumsList={setAlbumsList} setAlbumsSource={setAlbumsSource} />        
        </div>
      )}</div> : <h2>Loading...</h2>}

    </>
  )
}

export default Albums