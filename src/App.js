import React, { useEffect, useState }  from 'react'
import { BASE_URL } from './constants.js'
import useCheckUser  from './hooks/useCheckUser'
import './App.css'

function App() {

  const [url, setUrl] = useState([])

  useEffect(() => {
    setUrl(`${ BASE_URL }/users/check/`)
  }, [])

  useCheckUser(url)
  console.log(url)

  return (
    <>
    </>
  )
}

export default App
