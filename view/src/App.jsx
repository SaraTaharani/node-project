import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, createContext } from "react"
import Layout from './components/Layout'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import FullRegister from "./pages/FullRegiser"
import Info from "./pages/Info.jsx"
import Albums from "./pages/Albums.jsx"
import Todos from "./pages/Todos.jsx"
import Posts from "./pages/Posts.jsx"
import LayoutUser from "./components/LayoutUser"
import Comments from "./pages/Comments"
import Photos from "./pages/Photos"
import "./cssFiles/App.css"
import "./cssFiles/Layout.css"


export const AppContext = createContext()

function App() {

  const [user, setUser] = useState({})

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/fullRegister" element={<FullRegister />} />
            <Route path="/home" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="user/:id" element={<LayoutUser />} >
                <Route path="info" element={<Info />} />
                <Route path="todos" element={<Todos />} />
                <Route path="posts" element={<Posts />} />
                <Route path="posts/:id/comments" element={<Comments />} />
                <Route path="albums" element={<Albums />} />
                <Route path="albums/:id/photos" element={<Photos/>} />
              </Route>

            </Route>
          </Routes>
        </AppContext.Provider >
      </BrowserRouter>

    </>
  )
}

export default App
