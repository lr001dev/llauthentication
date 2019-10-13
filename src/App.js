import React, { useEffect, useState }  from 'react'
import { BASE_URL } from './constants.js'
import useCheckUser  from './hooks/useCheckUser'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import { Container, Tabs, Tab } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {

  //Lets Inititalize State
  const [url] = useState(`${ BASE_URL }/users/check/`)
  const [loggedIn, setloggedIn] = useState()

  //Our hooks
  const { user } = useCheckUser(url)

  //Setting state for user object triggered by LoginForm.js
  useEffect(() => {
    setloggedIn(loggedIn)
  }, [loggedIn])


  //Setting state for user object triggered by useCheckUser hook
  useEffect(() => {
    setloggedIn(user)
  }, [user])

  if(loggedIn) {
    return (
      <>
        <Container className="auth-box">
          <h1> Hello Lemonlight! My name is {user.first_name}.</h1>
          <LogoutForm
            setloggedIn = { setloggedIn }
          />
        </Container >
      </>
    )
  } else {
    return (
      <>
        <Container className="auth-box">
          <h1> Welcome to Lemonlight! </h1>
          <Tabs defaultActiveKey="login" id="home-tabs">
            <Tab eventKey="login" title="Login">
              <LoginForm
                setloggedIn = { setloggedIn }
              />
            </Tab>
            <Tab eventKey="create-account" title="Create Account">

            </Tab>
          </Tabs>
        </Container >
      </>
    )
  }
}

export default App
