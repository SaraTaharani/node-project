import React, { useState } from "react"
// import { TodoContext } from "../pages/Todos"

function SingleTodo(props) {

    // const { todosList, setTodosList } = useContext(TodoContext)
    const [displayUpdate, setDisplayUpdate] = useState(false)
    const [todo, setTodo] = useState(props.todo)

    function update(todo) {
        fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json)
            .then(data => {
                if (data) {
                    props.setTodosList(prev => prev.map(td => td.id == todo.id ? todo : td))
                    props.setTodosSource(props.todosList)
                }
                else {
                    alert("There is no such todo to delete")
                }
            })
            .catch(error => console.error("Error fetching data from server:", error))
        setDisplayUpdate(false)
    }

    function deleteTodo(id) {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json)
            .then(data => {
                if (data) {
                    props.setTodosList(prev => prev.filter(todo => todo.id != id))
                    props.setTodosSource(props.todosList)
                }
                else {
                    alert("There is no such todo to delete")
                }
            })
            .catch(error => console.error("Error fetching data from server:", error))
    }

    return (
        <div>
            <h4>id: {todo.id}</h4>
            <label htmlFor="title">title</label>
            <input id="title" value={todo.title} onChange={(e) => {
                setTodo({ ...todo, title: e.target.value })
                setDisplayUpdate(true)

            }} />
            <label htmlFor="isCompleted">execution</label>
            <input id="isCompleted" type="checkbox" checked={todo.completed} onChange={(e) => {
                setTodo({ ...todo, completed: !todo.completed })
                setDisplayUpdate(true)
            }} />
            {displayUpdate && <button onClick={() => update(todo)}>update</button>}
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
        </div>
    )
}

export default SingleTodo
