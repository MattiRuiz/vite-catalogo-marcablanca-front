import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './Components/Navbar/Navbar'

import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Welcome from './Components/Welcome/Welcome'
import Catalog from './Components/Catalog/Catalog'
import Configuraciones from './Components/Configuraciones/Configuraciones'
import Admin from './Components/Admin/Admin'
import NotFound from './Components/404/NotFund'
import Contacto from './Components/Contacto/Contacto'

function App() {
  const auth = localStorage.getItem('token')
  return (
    <>
      <Navbar />
      <Container fluid className="px-0 bg-white alto-container">
        <Routes>
          <Route path="/" element={<>{auth ? <Welcome /> : <Home />}</>} />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/welcome"
            element={
              <>
                <Welcome />
              </>
            }
          />
          <Route
            path="/catalogo"
            element={
              <>
                <Catalog />
              </>
            }
          />
          <Route
            path="/catalogo/:id"
            element={
              <>
                <Catalog />
              </>
            }
          />
          <Route
            path="/configuracion"
            element={
              <>
                <Configuraciones />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <Admin />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <NotFound />
              </>
            }
          />
          <Route
            path="/contacto"
            element={
              <>
                <Contacto />
              </>
            }
          />
        </Routes>
      </Container>
    </>
  )
}

export default App
