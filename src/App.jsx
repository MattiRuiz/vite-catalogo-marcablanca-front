import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './Components/Navbar/Navbar'

import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Welcome from './Components/Welcome/Welcome'
import Catalog from './Components/Catalog/Catalog'
import MiCuenta from './Components/Configuraciones/MiCuenta'
import Precios from './Components/Configuraciones/Precios'
import Admin from './Components/Admin/Admin'
import NotFound from './Components/404/NotFund'
import Contacto from './Components/Contacto/Contacto'
import Footer from './Components/Footer/Footer'
import Suscripcion from './Components/Suscripcion/Suscripcion'
import Terminos from './Components/Terminos/Terminos'

function App() {
  return (
    <>
      <Container fluid className="bg-white alto-container">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
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
            path="/suscripciones"
            element={
              <>
                <Suscripcion />
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
            path="/mi-cuenta"
            element={
              <>
                <MiCuenta />
              </>
            }
          />
          <Route
            path="/configurar-precios"
            element={
              <>
                <Precios />
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
          <Route
            path="/terminos-y-condiciones"
            element={
              <>
                <Terminos />
              </>
            }
          />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App
