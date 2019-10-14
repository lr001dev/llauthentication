import { useState, useEffect } from 'react'
import { BASE_URL } from '../constants.js'
import { toast } from 'react-toastify'

const useLogInUser = (formInputs) => {
  const[user, setUser] = useState([])

  const notify = () => {
    toast.error("Invalid Login Please Try Again !", {
        position: toast.POSITION.TOP_CENTER
      })
  }

  useEffect(() => {
    if(formInputs === '') {
      console.log('rendering')
    } else {
      console.log('im loggin you in')
        fetch(`${ BASE_URL }/users/login/`, {
          body: JSON.stringify(formInputs),
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
          }
        }).then(response => response.json())
          .then((userIsLoggedIn) => {
            if(userIsLoggedIn.status === 401 ) {
              setUser(false)
              notify()
            } else {
              console.log('setting login response')
              console.log(userIsLoggedIn)
              setUser(userIsLoggedIn)
              console.log(user)
            }
          })
          .catch(error=> console.log(error))
      }
  }, [formInputs])

  return user
}

export default useLogInUser
