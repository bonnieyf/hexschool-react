import { useState, useEffect } from 'react'
import { Container } from '@mui/material/'
import Login from './Login'
import Signup from './Signup'
import Checkout from './Checkout'
import Todo from './Todo'

function Week3 () {
  const [token, setToken] = useState('')
  const TodoToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('hexschoolTodo='))
    ?.split('=')[1]

  const [isCheckUser, setIsCheckUser] = useState('')

  useEffect(() => {
    if (TodoToken) {
      setToken(TodoToken)
    }
  }, [])
  return (
    <>
      <Container>
        <Signup />
        <br />
        <Login
          setToken={setToken}
          setIsCheckUser={setIsCheckUser}
          token={token}
        />
        <Checkout setToken={setToken} isCheckUser={isCheckUser} token={token} />

        {isCheckUser && (
          <>
            <h2>Todo list</h2>
            <Todo token={token} />
          </>
        )}
      </Container>
    </>
  )
}

export default Week3
