import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData) {
      setUser(userData)
    } else {
      setUser(null)
    }
  }

  const unauthorize = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    localStorage.removeItem('exp')
    localStorage.removeItem('ganancia')
    localStorage.removeItem('showGanancia')
    setUser(null)
    navigate('/')
  }

  const checkUser = () => {
    const exp = localStorage.getItem('exp')
    if (exp && Number(exp) < Date.now()) {
      unauthorize()
      console.log('Tiempo de sesión caducado, inicie sesión nuevamente.')
    } else {
      const userData = JSON.parse(localStorage.getItem('userData'))
      if (userData) {
        setUser(userData)
      } else {
        unauthorize()
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
          setUser(null)
          console.error('Unauthorized', error.response)
          navigate('/')
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  const data = { handleLogin, checkUser, user, setUser, unauthorize }

  return (
    <>
      <LoginContext.Provider value={data}>{children}</LoginContext.Provider>
    </>
  )
}

export { LoginProvider }
export default LoginContext
