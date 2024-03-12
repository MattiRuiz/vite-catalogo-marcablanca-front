import { createContext, useState, useEffect } from 'react'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [menu, setMenu] = useState(false)

  const handleLogin = (resp) => {
    setAuth(resp)
    setMenu(true)
  }

  const unauthorize = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    handleLogin({})
    setMenu(false)
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
  }, [])

  const data = { handleLogin, unauthorize, checkUser, menu }

  return <LoginContext.Provider value={data}>{children}</LoginContext.Provider>
}

export { LoginProvider }
export default LoginContext
