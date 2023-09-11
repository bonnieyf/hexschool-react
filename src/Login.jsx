import { useState, useEffect } from 'react'
import { Container } from '@mui/material/'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const { VITE_APP_SITE } = import.meta.env

function Login ({ token, setToken, setIsCheckUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  function HandleChange (e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  async function userLogin () {
    try {
      const response = await axios.post(
        `${VITE_APP_SITE}/users/sign_in`,
        formData
      )
      setToken(response.data.token)
      setIsCheckUser(true) // 更新 isCheckUser 状态为 true
    } catch (error) {
      setToken('登入失敗: ' + error.message)
    }
  }

  async function userLogout () {
    try {
      const response = await axios.post(
        `${VITE_APP_SITE}/users/sign_out`,
        {},
        {
          headers: {
            Authorization: token
          }
        }
      )
      setToken('登出成功:' + response.data.token)
      setIsCheckUser(false)
    } catch (error) {
      setToken('登出失敗: ' + error.message)
    }
  }

  return (
    <>
      <Container>
        <h1>Login</h1>
        {JSON.stringify(formData)}
        {}
        <form action=''>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={HandleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={HandleChange}
          />
          <button
            type='button'
            onClick={e => {
              e.preventDefault()
              userLogin()
            }}
          >
            Login
          </button>
          <p>Token: {token}</p>
        </form>
        <br />
        <button
          type='button'
          onClick={e => {
            e.preventDefault()
            userLogout()
          }}
        >
          LogOut
        </button>
      </Container>
    </>
  )
}

export default Login
