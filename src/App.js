import React, { useEffect, useState }  from 'react'
import { BASE_URL } from './constants.js'
import useCheckUser  from './hooks/useCheckUser'
import LoginForm from './components/LoginForm'
import './App.css'

function App() {

  const [url, setUrl] = useState(`${ BASE_URL }/users/check/`)
  const [loggedIn, setloggedIn] = useState()

  const { user } = useCheckUser(url)

  useEffect(() => {
    setloggedIn(user)
  }, [user])

  useEffect(() => {
    setloggedIn(loggedIn)
  }, [loggedIn])

  return (
    <>
      <LoginForm
        setloggedIn = { setloggedIn }
      />
    </>
  )
}

export default App
