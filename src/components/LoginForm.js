import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import useLoginUser from '../hooks/useLoginUser'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = ({ setloggedIn }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [formInputs, setFormInputs] = useState('')
  const { user }  = useLoginUser(formInputs)

  useEffect(() => {
    setloggedIn(user)
  }, [user])

  const handleSubmit = (event) => {
    event.preventDefault()
    let formInputs = {
      user: {
        email: email,
        password: password
      }
    }
    // loginUser(formInputs)
    setFormInputs(formInputs)
    setEmail('')
    setPassword('')
  }

  return(
    <>
      <ToastContainer
          autoClose= { 3000 }
      />
      <h1 className="form-header-text">Welcome Back! </h1>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            id="email"
            type="email"
            onChange={(event) => {
              setEmail(event.target.value)
            }}
            value= { email }
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            id="password"
            type="text"
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            value= { password }
            placeholder="password"
          />
        </Form.Group>
        <Button variant="success" type="submit">Login</Button>
      </Form>
    </>
  )
}

export default Login
