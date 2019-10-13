import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { BASE_URL } from '../constants.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = ({ setloggedIn }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    let formInputs = {
      user: {
        email: email,
        password: password
      }
    }
    loginUser(formInputs)
    setEmail('')
    setPassword('')
  }

  const notify = () => {
    toast.error("Invalid Login Please Try Again !", {
        position: toast.POSITION.TOP_CENTER
      })
  }

  const loginUser = (formInputs) => {

    fetch(`${ BASE_URL }/users/login/`, {
      body: JSON.stringify(formInputs),
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      }
    }).then(loginResponse => loginResponse.json())
      .then((userIsLoggedIn) => {
        if(userIsLoggedIn.status === 401 ) {
          setloggedIn(false)
          notify()
        } else {
          setloggedIn(userIsLoggedIn)
        }
      })
      .catch(error=> console.log(error))
  }

  return(
    <>
      <ToastContainer
          autoClose= { 3000 }
      />
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
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </>
  )
}

export default Login
