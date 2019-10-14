import React, { useEffect, useState }  from 'react'
import { BASE_URL } from './constants.js'
import useCheckUser  from './hooks/useCheckUser'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import LogoutForm from './components/LogoutForm'
import { Container, Card, Button, ButtonGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {

  //Lets Inititalize State
  const [url] = useState(`${ BASE_URL }/users/check/`)
  const [loggedIn, setloggedIn] = useState()
  const [classKeyLogin, setClassKeyLogin] = useState('hide')
  const [classKeySignup, setClassKeySignup] = useState('show')
  const [variantKeySignup, setVariantKeySignup] = useState('success')
  const [variantKeyLogin, setVariantKeyLogin] = useState('secondary')

  //Our hooks
  const { user } = useCheckUser(url)

  //Setting state for user object triggered by useCheckUser hook
  useEffect(() => {
    setloggedIn(user)
  }, [user])

  if(loggedIn) {
    return (
      <>
        <Container className="auth-box">
          <h1> Hello Lemonlight! My name is { loggedIn.first_name }.</h1>
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
          <div className="d-flex flex-column">
            <ButtonGroup size="lg">
            <Button
              variant= { variantKeySignup }
              onClick= {() => {
              setClassKeySignup('show')
              setClassKeyLogin('hide')
              setVariantKeySignup('success')
              setVariantKeyLogin('secondary')
            }}>Signup</Button>

              <Button
                variant= { variantKeyLogin }
                onClick= {() => {
                setClassKeyLogin('show')
                setClassKeySignup('hide')
                setVariantKeySignup('secondary')
                setVariantKeyLogin('success')
              }}>Login</Button>

            </ButtonGroup>
            <div className={ classKeyLogin }>
                <Card body>
                  <LoginForm
                    setloggedIn = { setloggedIn }
                  />
                </Card>
            </div>
            <div className={ classKeySignup }>
                <Card body>
                  <SignUp
                    setloggedIn = { setloggedIn }
                  />
                </Card>
            </div>
          </div>
        </Container >
      </>
    )
  }
}

export default App
