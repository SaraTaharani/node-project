import React, { useState, useRef } from "react"
// import { AlbumContext } from "../pages/Albums"
import { Link } from 'react-router-dom'
import Albums from "../pages/Albums"

function SingleAlbum(props) {

    // const { albumsList, setAlbumsList } = useContext(AlbumContext)
    const [displayUpdate, setDisplayUpdate] = useState(false)
    const [album, setAlbum] = useState(props.album)
    const [showDetails, setShowDetails] = useState(false)

    function update(album) {
        fetch(`http://localhost:3000/albums/${album.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(album)
        })
            .then(res => res.json)
            .then(data => {
                if (data) {
                    props.setAlbumsList(prev => prev.map(al => al.id == album.id ? album : al))
                    props.setAlbumsSource(props.albumList)
                }
                else {
                    alert("There is no such album to delete")
                }
            })
            .catch(error => console.error("Error fetching data from server:", error))
        setDisplayUpdate(false)
    }

    function deleteAlbum(id) {
        fetch(`http://localhost:3000/albums/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json)
            .then(data => {
                if (data) {
                    props.setAlbumsList(prev => prev.filter(album => album.id != id))
                    props.setAlbumsSource(props.albumsList)
                }
            })
            .catch(error => console.error("Error fetching data from server:", error))
    }

    return (
        <div>
            <Link to={`${album.id}/photos`}>
                <h4>id: {album.id}</h4>
                <p>title: {album.title}</p>

            </Link>

        </div>
    )
}

export default SingleAlbum
