import React, { useEffect, useState, useContext, useRef } from "react"
import { AppContext } from "../App.jsx"
import SingleTodo from "../components/SingleTodo.jsx"

function Todos() {

  const { user } = useContext(AppContext)
  const [todosSource, setTodosSource] = useState([])
  const [todosList, setTodosList] = useState([])
  const [searchChoosen, setSearchChoosen] = useState("")
  const [searchType, setSearchType] = useState("")
  const [sortType, setSortType] = useState("Serial")
  const [displayNewTodo, setDisplayNewTodo] = useState(false)
  const [newTodo, setNewTodo] = useState({ userId: user.id, id: "", title: "", completed: false })
  const [textType, setTextType] = useState(true)

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("currentUser")))
    }
  }, [])


  function shuffleArray(array) {
    let randomIndex, tmp
    for (let i = array.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * i)
      tmp = array[i]
      array[i] = array[randomIndex]
      array[randomIndex] = tmp
    }
    return array
  }

  function addTodo(todo) {
    fetch('http://localhost:3000/todos', {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setTodosList([...todosList, data])
          setTodosSource(todosList)
        } else {
          alert("There are no todos for this user")
        }
      })
      .catch(error => console.error("Error fetching datPosta from server:", error))
    setDisplayNewTodo(false)
  }


  useEffect(() => {
    fetch(`http://localhost:3000/todos?&userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setTodosList(data)
          setTodosSource(data)
        }
        else {
          alert("There are no todos for this user")
        }
      })
      .catch(error => console.error("Error fetching data from server:", error))
  }, [])

  useEffect(() => {

    switch (sortType) {
      case "Serial":
        setTodosList([...todosList].sort((a, b) => {
          return a.id < b.id ? -1 : 1;
        }))
        break
      case "Execution":
        setTodosList([...todosList].sort((a, b) => {
          return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
        }))
        break
      case "Alphabetic":
        setTodosList([...todosList].sort((td1, td2) => td1.title.localeCompare(td2.title)))
        break
      case "Random":
        setTodosList(shuffleArray([...todosList]))
        break
    }
  }, [sortType])

  useEffect(() => {

    switch (searchType) {
      case "SelectAll":
        setTextType(true)
        setTodosList(todosSource)
        break
      case "Id":
        setTextType(true)
        if (searchChoosen != "") {
          setTodosList(todosSource.filter((todo) => todo.id == searchChoosen))
        }
        break
      case "Title":
        setTextType(true)
        setTodosList(todosSource.filter((todo) => todo.title.includes(searchChoosen)))
        break
      case "ExecutionCondition":
        setTextType(false)
        setTodosList(todosSource.filter((todo) => todo.completed == searchChoosen))
        break
    }
  }, [searchChoosen, searchType])

  return (
    <>
      <label htmlFor="sort">Choose sort type</label>
      <select id="sort" className="select" onChange={(e) => setSortType(e.target.value)}>
        <option value="Serial">Serial</option>
        <option value="Execution">Execution</option>
        <option value="Alphabetic">Alphabetic</option>
        <option value="Random">Random</option>
      </select><br />

      <label htmlFor="search">Search by criteria</label>
      <select id="search" className="select" onChange={(e) => {
        setSearchChoosen("")
        setSearchType(e.target.value)
      }}>
        <option value="SelectAll">select all</option>
        <option value="Id">Id</option>
        <option value="Title">Title</option>
        <option value="ExecutionCondition">Execution condition</option>
      </select>

      {textType ? <input type="text" value={searchChoosen} placeholder="enter your choosen" onChange={(e) => setSearchChoosen(e.target.value)} />
        : <input type="checkbox" checked={false} onChange={(e) => setSearchChoosen(e.target.checked)} />
      }

      <button className="newButton" onClick={() => {
        setDisplayNewTodo(true)
        setNewTodo({ userId: user.id, id: "", title: "", completed: false })
      }}>new todo</button>

      {todosList ? 
      <div className="gridItems">
      {todosList.map((todo) =>
        <div key={todo.id} className="singleItem">
          <SingleTodo todo={todo} todosList={todosList} setTodosList={setTodosList} setTodosSource={setTodosSource} />  
        </div>
      )}</div> : <h2>Loading...</h2>}

      {displayNewTodo && <div className="new">
        <label htmlFor="title">title</label>
        <input className="title" type="text" value={newTodo.title} onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })} />
        <label htmlFor="isCompleted">execution</label>
        <input type="checkbox" id="isCompleted" checked={newTodo.completed} onChange={(e) => setNewTodo({ ...newTodo, completed: !newTodo.completed })} />
        <button onClick={() => addTodo(newTodo)}>add</button>
      </div>}
    </>
  )

}
export default Todos