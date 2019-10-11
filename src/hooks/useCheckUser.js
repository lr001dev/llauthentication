import { useState, useEffect } from "react"

const useCheckUser = (url) => {
  console.log(url)
  const [user, setUser] = useState([])
  useEffect(() => {
    console.log(url)
    fetch(url, {
      credentials: 'include'
    })
    .then(response => response.json())
    .then((userIsLoggedIn) => {
      setUser(userIsLoggedIn)
    }).catch(err=> console.log(err))
  }, [url])

  return user
}

export default useCheckUser
