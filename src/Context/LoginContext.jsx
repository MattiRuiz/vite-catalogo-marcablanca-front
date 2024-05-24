import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import PopUpUnauthorize from './PopUpUnauthorize'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [menu, setMenu] = useState()
  const [popUpUnauthorized, setPopUpUnauthorize] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (resp) => {
    setAuth(resp)
    const token = localStorage.getItem('token')
    if (token) {
      const user = {
        token: token,
        userData: JSON.parse(localStorage.getItem('userData')),
      }
      setMenu(user)
    } else {
      setMenu()
    }
  }

  const unauthorize = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    localStorage.removeItem('exp')
    setAuth({})
    setMenu(false)
    navigate('/')
  }

  const checkUser = () => {
    const exp = localStorage.getItem('exp')
    if (Number(exp) < Date.now()) {
      unauthorize()
    } else {
      const token = localStorage.getItem('token')
      if (auth && token) {
        setMenu(auth)
      } else if (!auth && token) {
        const user = {
          token: token,
          userData: localStorage.getItem('userData'),
        }
        handleLogin(user)
        setMenu(user)
      } else {
        unauthorize()
        console.log('Su sesión ha terminado')
      }
    }
  }

  useEffect(() => {
    checkUser()

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          localStorage.removeItem('token')
          localStorage.removeItem('exp')
          localStorage.removeItem('userData')
          setAuth({})
          setMenu(false)
          setPopUpUnauthorize(true)
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  const data = { handleLogin, checkUser, menu, setMenu, unauthorize }

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
