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
    localStorage.removeItem('exp')
    setAuth({})
    setMenu(false)
    navigate('/')
  }

  const checkUser = () => {
    const exp = localStorage.getItem('exp')
    if (Number(exp) < Date.now()) {
      unauthorize()
      console.log('Su sesión ha expirado.')
    } else {
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
        unauthorize()
        console.log('Su sesión ha terminado | !auth&&!token')
      }
    }
    console.log('Dentro de checkuser', Number(exp) < Date.now())
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
