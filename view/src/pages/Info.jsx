import React, { useContext } from "react"
import { AppContext } from "../App.jsx"

function Info() {
  const { user, setUser } = useContext(AppContext)


  return (
    <>
      <div className="infoDiv">  
        id: {user.id} <br />
        name: {user.name} <br />
        username: {user.username} <br />
        email: {user.email} <br />
        address: {user.address.street} {user.address.city} <br />
        zipcode: {user.address.zipcode} <br />
        phone: {user.phone} <br />
        company: {user.company.name} <br />
      </div>
    </>
  )
}

export default Info
