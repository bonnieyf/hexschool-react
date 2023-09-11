import { useState, useEffect } from 'react'
import { Container } from '@mui/material/'
import axios from 'axios'

const { VITE_APP_SITE } = import.meta.env

function Checkout ({ token, setToken, isCheckUser }) {
  const [message, setMessage] = useState('')
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    if (isCheckUser) {
      userCheckout()
    }
  }, [isCheckUser]) // 添加 isCheckUser 作为依赖

  const userCheckout = async () => {
    setIsChecking(true)
    setMessage('驗證中...')

    const tomorrow = new Date()
    document.cookie = `hexschoolTodo=${token}; expires=${tomorrow.toUTCString()}`
    console.log(
      document.cookie.split('; ').find(row => row.startsWith('hexschoolTodo'))
    )

    try {
      const response = await axios.get(`${VITE_APP_SITE}/users/checkout`, {
        headers: {
          Authorization: token
        }
      })
      setMessage('驗證成功 UID: ' + response.data.uid)
    } catch (error) {
      setMessage('驗證失敗: ' + error.message)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <>
      <Container>
        <p>{message}</p>
      </Container>
    </>
  )
}

export default Checkout
