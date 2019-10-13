import { useState, useEffect } from "react"

const useCheckUser = (url) => {
  const [user, setUser] = useState([])

  useEffect(() => {
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
