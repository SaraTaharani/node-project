import React, { useState ,useContext } from "react"
import { Link ,useNavigate} from "react-router-dom"
import {AppContext} from "../App.jsx"

function Register() {
  
  const { user, setUser } = useContext(AppContext)
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(() => {
      return {
        ...formData,
        [name]: value
      }
    })
  }
  function checkUser(e) {
    e.preventDefault()

    fetch(`http://localhost:3000/users?username=${formData.username}&website=${formData.password}`)
      .then(res => res.json())//maybe remove then
      .then(data => {
        if (!data[0]) {
          setUser(formData)
          navigate("/fullRegister")
        }
        else {
          alert("Exist user")
          navigate("/login")
        }
      })
      .catch(error => console.error("Error fetching data from server:", error))
  }
    return (
      <div>
        <form id="register">
            <h1>register</h1>
    
            <label htmlFor="username">username</label>
            <input type="text" id="username" name="username" onChange={handleChange}></input><br />
    
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" onChange={handleChange}></input><br />

            <label htmlFor="verify-password">verify password</label>
            <input type="password" id="verify-password"  name="verify-password" onChange={handleChange}></input><br />
    
            <button id="button-save" onClick={(e)=> checkUser(e)}>save</button>
            <p><Link to="/login">login here</Link>Already have an account?</p>
        </form>
      </div>
    )
  }
  
  export default Register