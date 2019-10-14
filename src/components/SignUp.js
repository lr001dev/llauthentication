import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../constants.js'
import useLoginUser from '../hooks/useLoginUser'
import { Form, Col, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignUp = ({ setloggedIn }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ autoLogin, setAutoLogin ] = useState('')
  const { user }  = useLoginUser(autoLogin)

  useEffect(() => {
    setloggedIn(user)
  }, [user])

  const handleSubmit = (event) => {
    event.preventDefault()
    let formInputs = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      }
    }
    createAccount(formInputs)
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }

  const notify = () => {
    toast.error("Account already with that email address", {
        position: toast.POSITION.TOP_CENTER
      })
  }

  const createAccount = (formInputs) => {

    const loginCredentials = {
      user: {
        email: formInputs.user.email,
        password: formInputs.user.password
      }
    }

    fetch(`${ BASE_URL }/users/`, {
      body: JSON.stringify(formInputs),
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      }
    }).then((theResponse) => {
        if(theResponse) {
          setAutoLogin(loginCredentials)
        } else {

        }
      })
      .catch((error) => {
          console.log(error)
          notify()
      })
  }

  return(
    <>
      <ToastContainer
          autoClose= { 3000 }
      />
      <h1 className="form-header-text">Sign Up For Free!</h1>
      <Form onSubmit={handleSubmit} className="create-form">
        <Form.Row >
          <Col>
            <Form.Group >
              <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  id="first_name"
                  type="text"
                  onChange={(event) => {
                    setFirstName(event.target.value)
                  }}
                  value= { firstName }
                  placeholder="First Name*"
                />
              </Form.Group>
          </Col>
          <Col>
            <Form.Group >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                id="last_name"
                type="text"
                onChange={(event) => {
                  setLastName(event.target.value)
                }}
                value= { lastName }
                placeholder="Last Name*"
              />
            </Form.Group>
          </Col>
        </Form.Row>
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
            placeholder="Email Address*"
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
            placeholder="Set A Password*"
          />
        </Form.Group>
        <Button size="lg" variant="success" type="submit">Get Started</Button>
      </Form>
    </>
  )
}

export default SignUp
