import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { BASE_URL } from '../constants.js'

const LogOut = ({ setloggedIn }) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    logoutUser()
  }

  const logoutUser = () => {

    console.log('destroy cookie')
    fetch(`${ BASE_URL }/users/destroyCookie/`, {
      method: 'DELETE',
      credentials: 'include'
    }).then(() => {
      setloggedIn(false)
    }).catch(err=> console.log(err))
  }

  return(
    <>
      <Form  onSubmit={handleSubmit}>
        <Form.Row>
          <Button className="login-button" variant="primary" type="submit">Log Out</Button>
        </Form.Row>
      </Form>
    </>
  )
}

export default LogOut
