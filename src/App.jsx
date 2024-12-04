import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './Components/Navbar/Navbar'

import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Catalogo from './Components/Catalogo/Catalogo'
import MiCuenta from './Components/Configuraciones/MiCuenta'
import Visualizacion from './Components/Configuraciones/Visualizacion'
import Admin from './Components/Admin/Admin'
import NotFound from './Components/NotFound/NotFound'
import Contacto from './Components/Contacto/Contacto'
import Footer from './Components/Footer/Footer'
import Suscripcion from './Components/Suscripcion/Suscripcion'
import Terminos from './Components/Terminos/Terminos'
import Ventajas from './Components/Ventajas/Ventajas'
import ListaDePrecio from './Components/Configuraciones/ListaDePrecio'

function App() {
  return (
    <>
      <Container fluid className="bg-white alto-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/suscripciones" element={<Suscripcion />} />
          <Route path="/catalogo/:id" element={<Catalogo />} />
          <Route path="/mi-cuenta" element={<MiCuenta />} />
          <Route path="/configurar-visualizacion" element={<Visualizacion />} />
          <Route path="/administrador-marcablanca" element={<Admin />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/terminos-y-condiciones" element={<Terminos />} />
          <Route path="/ventajas" element={<Ventajas />} />
          <Route path="/lista-de-precios" element={<ListaDePrecio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App
