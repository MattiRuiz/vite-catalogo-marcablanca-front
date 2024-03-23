import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import PopUpUnauthorize from './PopUpUnauthorize'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [menu, setMenu] = useState(false)
  const [popUpUnauthorized, setPopUpUnauthorize] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (resp) => {
    setAuth(resp)
    setMenu(true)
  }

  const unauthorize = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    setAuth({})
    setMenu(false)
    navigate('/')
  }

  const checkUser = () => {
    const token = localStorage.getItem('token')
    if (auth && token) {
      setMenu(true)
    } else if (!auth && token) {
      const user = {
        token: token,
        userData: localStorage.getItem('userData'),
      }
      handleLogin(user)
      setMenu(true)
    } else {
      handleLogin({})
      setMenu(false)
    }
  }

  useEffect(() => {
    checkUser()

    // Interceptor de estado 403
    // const responseInterceptor = axios.interceptors.response.use(
    //   (response) => {
    //     return response
    //   },
    //   (error) => {
    //     if (error.response && error.response.status === 403) {
    //       localStorage.removeItem('token')
    //       localStorage.removeItem('userData')
    //       setAuth({})
    //       setMenu(false)
    //       setPopUpUnauthorize(true)
    //       navigate('/')
    //     }
    //     return Promise.reject(error)
    //   }
    // )
    // return () => {
    //   axios.interceptors.response.eject(responseInterceptor)
    // }
  }, [])

  const data = { handleLogin, checkUser, menu, unauthorize }

  return (
    <>
      <LoginContext.Provider value={data}>{children}</LoginContext.Provider>
      {popUpUnauthorized && (
        <PopUpUnauthorize closePopUp={() => setPopUpUnauthorize(false)} />
      )}
    </>
  )
}

export { LoginProvider }
export default LoginContext
