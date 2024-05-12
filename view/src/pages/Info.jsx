import React, { useContext } from "react"
import { AppContext } from "../App.jsx"

function Info() {
  const { user, setUser } = useContext(AppContext)


  return (
    <>
      <div className="infoDiv">  
        id: {user.userId} <br />
        name: {user.name} <br />
        username: {user.username} <br />
        email: {user.email} <br />
        address: {user.street} , {user.city} <br />
        phone: {user.phone} <br />
      </div>
    </>
  )
}

export default Info
