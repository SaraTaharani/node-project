import React, { useEffect, useMemo, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import SinglePhoto from "../components/SinglePhoto.jsx"

function Photos() {
    const albumParams = useParams()
    const [photos, setPhotos] = useState([])
    const [newPhoto, setNewPhoto] = useState({ albumId: albumParams.id, id: "", title: "", url: "", thumbnailUrl: "" })
    const [displayNewPhoto, setDisplayNewPhoto] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)


    function addPhoto(photo) {
        fetch('http://localhost:3000/photos', {
            method: "POST",
            body: JSON.stringify(photo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setPhotos([...photos, data])
                }
            })
            .catch(error => console.error("Error fetching data from server:", error))
        setDisplayNewPhoto(false)
    }

    
    function fetchPhotos() {
            setIsLoading(true)
            const limit = 10
            fetch(`http://localhost:3000/photos?albumId=${albumParams.id}&_page=${page}&_limit=${limit}`)//
                .then(res => res.json())
                .then(data => {
                        if (data) {
                                if (data.length > 0) {
                                        setPhotos(prev => [...prev, ...data])
                                        setPage(prevPage => prevPage + 1)
                                    } else {
                                            alert("There are no more photos for this album.")
                                        }
                }
                else {
                        alert("There are no photos for this album.")
                    }
                })
                .catch(error => console.error("Error fetching data from server:", error))
            setIsLoading(false)
        }

        useEffect(() => {
            if (photos.length === 0) {
                fetchPhotos()
            }
        }, [])

    return (
        <div>
            <button className="newButton" onClick={() => {
                setDisplayNewPhoto(true)
                setNewPhoto({ albumId: albumParams.id, id: "", title: "", url: "", thumbnailUrl: "" })
            }}>new photo</button>

            {displayNewPhoto && <div className="new">
                <label htmlFor="title">title</label>
                <input id="title" type="text" value={newPhoto.title} onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })} />

                <label htmlFor="thumbnailUrl">thumbnailUrl</label>
                <input id="thumbnailUrl" type="text" value={newPhoto.thumbnailUrl} onChange={(e) => setNewPhoto({ ...newPhoto, thumbnailUrl: e.target.value })} />

                <button onClick={() => addPhoto(newPhoto)}>add</button>
            </div>}

            {!isLoading ? 
            <div className="gridItems">
            {photos.map((photo) =>
                <div key={photo.id} className="singleItem">
                    <SinglePhoto key={photo.id} photo={photo} setPhotos={setPhotos} />
                </div>
            )}</div> : <h2>Loading...</h2>}

            <button onClick={() => fetchPhotos()}>show more</button>

            <button><Link to={`../albums`}>close</Link></button>
        </div>
    )
}

export default Photos