import WelcomeLog from './WelcomeLog'
import WelcomeUnlog from './WelcomeUnlog'

const Welcome = () => {
  const auth = localStorage.getItem('token')
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