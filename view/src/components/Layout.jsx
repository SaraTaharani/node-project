import React, { useContext } from "react"
import { Outlet, NavLink, Link } from 'react-router-dom'
import { AppContext } from "../App.jsx"

function Layout() {
  const { user } = useContext(AppContext)


  return (
    <div className="navigation">
        <Link to="/home" className="homePage">home</Link>
      <nav>
        <NavLink to={`user/${user.id}/info`}
          className={({ isActive }) => isActive ? "activeLink" : null}>Info</NavLink>
        <NavLink to={`user/${user.id}/todos`}
          className={({ isActive }) => isActive ? "activeLink" : null}>Todos</NavLink>
        <NavLink to={`user/${user.id}/posts`}
          className={({ isActive }) => isActive ? "activeLink" : null}>Posts</NavLink>
        <NavLink to={`user/${user.id}/albums`}
          className={({ isActive }) => isActive ? "activeLink" : null}>Albums</NavLink>
        <NavLink to="/login"
          className={({ isActive }) => isActive ? "activeLink" : null}>logout</NavLink>
      </nav>

      <Outlet />
    </div>
  )
}

export default Layout
