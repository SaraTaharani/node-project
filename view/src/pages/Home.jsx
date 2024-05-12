import React, { useEffect, useContext } from "react"
// import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppContext } from "../App.jsx"

function Home() {
  
  const { user, setUser } = useContext(AppContext)
  
  
  return (
    <>
      <div className="hello">Hello {user.username}</div>
    </>
  )
}

export default Home
