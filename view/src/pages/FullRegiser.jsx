import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../App.jsx"

function FullRegister() {

    const { user, setUser } = useContext(AppContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        username: user.username,
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""
            }
        },
        phone: "",
        website: user.password,
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
    })

    function handleValueChange(event) {
        const { name, value } = event.target
        setFormData(() => {
            return {
                ...formData,
                [name]: value
            }
        })
    }
    function handleAdressChange(event) {
        const { name, value } = event.target
        setFormData(() => {
            return {
                ...formData,
                address: { ...formData.address, [name]: value }
            }
        })
    }

    function handleCompanyChange(event) {
        const { name, value } = event.target
        setFormData(() => {
            return {
                ...formData,
                company: { ...formData.company, [name]: value }
            }
        })
    }

    function newUser(e) {
        e.preventDefault()

        fetch('http://localhost:3000/users', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data)
                localStorage.setItem("currentUser", JSON.stringify(data))
            })
        navigate("/home")
    }

    return (
        <div>
            <form id="fullRegister">
                <h1>Full registration details</h1>

                <label htmlFor="name">name</label>
                <input type="text" id="name" name="name" onChange={handleValueChange} required></input><br />

                <label htmlFor="username">username</label>
                <input value={formData.username} type="text" id="username" name="username" onChange={handleValueChange} ></input><br />

                <label htmlFor="email">email</label>
                <input type="text" id="email" name="email" onChange={handleValueChange} required></input><br />

                <label htmlFor="password">password</label>
                <input value={formData.website} type="password" id="password" name="website" onChange={handleValueChange}></input><br />

                <label id="address">address</label><br />

                <label htmlFor="street">street</label>
                <input type="text" id="street" name="street" onChange={handleAdressChange} required></input><br />

                <label htmlFor="suite">suite</label>
                <input type="text" id="suite" name="suite" onChange={handleAdressChange}></input><br />

                <label htmlFor="city">city</label>
                <input type="text" id="city" name="city" onChange={handleAdressChange} required></input><br />

                <label htmlFor="zipcode">zipcode</label>
                <input type="text" id="zipcode" name="zipcode" onChange={handleAdressChange}></input><br />

                <label htmlFor="phone">phone</label>
                <input type="text" id="phone" name="phone" onChange={handleValueChange} required></input><br />

                <label id="company">company</label><br />

                <label htmlFor="compacompany-nameny">company-name</label>
                <input type="text" id="company-name" name="name" onChange={handleCompanyChange} required></input><br />

                <button id="button-enter" onClick={e => newUser(e)}>enter</button>
            </form>
        </div>
    )
}

export default FullRegister
