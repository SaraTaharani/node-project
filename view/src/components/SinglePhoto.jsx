import React, { useState } from "react"

function SinglePhoto(props) {
  const [photo, setPhoto] = useState(props.photo)
  const [displayUpdate, setDisplayUpdate] = useState(false)
  const [newUrl, setNewUrl] = useState(photo.thunbnailUrl)

  function deletePhoto(id) {
    fetch(`http://localhost:3000/photos/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json)
      .then(data => {
        if (data) {
          props.setPhotos((prev) => (prev.filter(photo => photo.id != id)))
        }
      })
      .catch(error => console.error("Error fetching data from server:", error))

  }

  function update(photo) {
    fetch(`http://localhost:3000/photos/${photo.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(photo)
    })
      .then(res => res.json)
      .then(data => {
        if (data) {
          props.setPhotos(prev => prev.map(ph => ph.id == photo.id ? photo : ph))
        }
      })
      .catch(error => console.error("Error fetching data from server:", error))
    setDisplayUpdate(false)
  }

  return (
    <div>

      <img src={photo.thumbnailUrl} alt={photo.title} />

      <button onClick={() => setDisplayUpdate(true)}>change photo</button>


      {displayUpdate && <>

        <input type="text" value={newUrl} onChange={(e)=> setNewUrl(e.target.value)} /> 
        <button onClick={() =>{setPhoto({...photo, thumbnailUrl:newUrl})
          update(photo) }}>update</button>

      </>}
        <button onClick={() => deletePhoto(photo.id)}>delete</button>
    </div>)

}

export default SinglePhoto
