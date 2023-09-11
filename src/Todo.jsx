import { useState, useEffect } from 'react'
import { Container } from '@mui/material/'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const { VITE_APP_SITE } = import.meta.env

function TodoList ({ token }) {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewtodo] = useState('')
  const [todoEdit, setTodoEdit] = useState({})

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    const res = await axios.get(`${VITE_APP_SITE}/todos`, {
      headers: {
        Authorization: token
      }
    })

    setTodos(res.data.data)
  }
  const addTodo = async () => {
    if (!newTodo) return
    const todo = {
      content: newTodo
    }

    await axios.post(`${VITE_APP_SITE}/todos`, todo, {
      headers: {
        Authorization: token
      }
    })

    setNewtodo('')
    getTodos()
  }

  return (
    <>
      <Container>
        <h1>TodoList</h1>
        <input
          type='text'
          onChange={e => setNewtodo(e.target.value)}
          placeholder='New Todo'
        />
        <button onClick={addTodo}>Add Todo</button>
        {todos.map((todo, index) => (
          <p key={index}>
            {todo.content}
            {todo.status ? 'Completed' : 'Pending'} |
          </p>
        ))}
      </Container>
    </>
  )
}

export default TodoList
