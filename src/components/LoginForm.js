import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { BASE_URL } from '../constants.js'

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
        setloggedIn(userIsLoggedIn)
      })
      .catch(error=> console.log(error))
  }

  return(
    <>
    <Form  onSubmit={handleSubmit}>
        <Form.Row className="login-form" >
          <Col>
            <Form.Control
              id="email"
              type="text"
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              value= { email }
              placeholder="Email"
            />
          </Col>
          <Col>
            <Form.Control
              id="password"
              type="text"
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              value= { password }
              placeholder="password"
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Button className="login-button" variant="primary" type="submit">Login</Button>
        </Form.Row>
      </Form>
    </>
  )
}

export default Login
