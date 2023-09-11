import { useState } from 'react'
import { Container } from '@mui/material/'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const { VITE_APP_SITE } = import.meta.env

function Signup () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: ''
  })

  const [message, setMessage] = useState('')

  function HandleChange (e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const navigate = useNavigate()

  async function userSignup () {
    try {
      const response = await axios.post(
        `${VITE_APP_SITE}/users/sign_up`,
        formData
      )
      setMessage('註冊成功. UID: ' + response.data.uid)
    } catch (error) {
      setMessage('註冊失敗:' + error.message)
    }
  }

  return (
    <>
      <Container>
        <h1>Sign up</h1>
        {JSON.stringify(formData)}
        <form action=''>
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={HandleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={HandleChange}
          />
          <input
            type='text'
            name='nickname'
            placeholder='nickname'
            onChange={HandleChange}
          />
          <button
            type='button'
            onClick={e => {
              e.preventDefault()
              userSignup()
            }}
          >
            Subtmit
          </button>
          <p>{message}</p>
        </form>
        <br />
      </Container>
    </>
  )
}

export default Signup
