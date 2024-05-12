import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../App.jsx"


function Login() {

  localStorage.setItem("currentUser", null)
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
  function existUser(e) {
    e.preventDefault()
    const request={
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username:formData.username, password:formData.password})  
    }
    fetch(`http://localhost:3000/users/logIn`, request)
      .then(res => res.json())
      .then(data => {
        if (data[0]) {
          localStorage.setItem("currentUser", JSON.stringify(data[0]))
          setUser(data[0])
          navigate("/home")
        }
        else {
          alert("The user does not exist")
          navigate("/register")
        }
      })
      .catch(error => console.error("Error fetching data from server:", error))

   }
  //   fetch(`http://localhost:3000/users?username=${formData.username}&password=${formData.password}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data[0]) {
  //         localStorage.setItem("currentUser", JSON.stringify(data[0]))
  //         setUser(data[0])
  //         navigate("/home")
  //       }
  //       else {
  //         alert("The user does not exist")
  //         navigate("/register")
  //       }
  //     })
  //     .catch(error => console.error("Error fetching data from server:", error))
  // }
  return (
    <div>
      <form id="login">
        <h1>login</h1>

        <label htmlFor="username">username</label>
        <input type="text" id="username" name="username" onChange={handleChange}></input><br />

        <label htmlFor="password">password</label>
        <input type="password" id="password" name="password" onChange={handleChange}></input><br />

        <button id="button-enter" onClick={e => existUser(e)}>enter</button>
        <p><Link to="/register">register here</Link>Haven't joined us yet?</p>
      </form>
    </div>
  )
}


export default Login
