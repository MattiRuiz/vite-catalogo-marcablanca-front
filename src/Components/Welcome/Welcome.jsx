import { useContext } from 'react'
import LoginProvider from '../../Context/LoginContext'
import WelcomeLog from './WelcomeLog'
import WelcomeUnlog from './WelcomeUnlog'
const Welcome = () => {
  const { auth } = useContext(LoginProvider)

  return (
    <>
    {
      auth ?
        <WelcomeLog></WelcomeLog>
      :
        <WelcomeUnlog></WelcomeUnlog>
    }
    </>
  )
}

export default Welcome