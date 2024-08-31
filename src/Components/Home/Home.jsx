import { useContext, useEffect } from 'react'
import HomeUnlog from './HomeUnlog'
import WelcomeLog from '../Welcome/WelcomeLog'

import LoginContext from '../../Context/LoginContext'

function Home() {
  const { checkUser } = useContext(LoginContext)

  useEffect(() => {
    checkUser()
  }, [])

  const auth = localStorage.getItem('token')

  return <>{auth ? <WelcomeLog /> : <HomeUnlog />}</>
}

export default Home
