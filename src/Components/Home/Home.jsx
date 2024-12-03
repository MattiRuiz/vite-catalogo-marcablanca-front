import { useContext, useEffect } from 'react'
import HomeUnlog from './HomeUnlog'
import WelcomeLog from '../Welcome/WelcomeLog'
import { Helmet } from 'react-helmet'

import LoginContext from '../../Context/LoginContext'

function Home() {
  const { checkUser } = useContext(LoginContext)

  useEffect(() => {
    checkUser()
  }, [])

  const auth = localStorage.getItem('token')

  return (
    <>
      <Helmet>
        <title>Bienvenidos a Marca Blanca</title>

        <meta
          name="description"
          content="Explora el catálogo de productos de Marca Blanca, calidad y los mejores precios de Rosario."
        />
        <meta
          name="keywords"
          content="blanquería, marca blanca, Rosario, Santa Fe, catálogo, mayorista, reventa, revendedores, rubro blanco, lista de precio"
        />

        <link rel="canonical" href="https://www.blanqueriamarcablanca.com/" />
      </Helmet>
      {auth ? <WelcomeLog /> : <HomeUnlog />}
    </>
  )
}

export default Home
