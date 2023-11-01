import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Welcome from "./Components/Welcome/Welcome";
import Catalog from "./Components/Catalog/Catalog";
import ListaPrecio from "./Components/ListaPrecio/ListaPrecio";
import Admin from "./Components/Admin/Admin";

function App() {
  return (
    <div>
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
            path="/catalogo/:id"
            element={
              <>
                <Catalog />
              </>
            }
          />
          <Route
            path="/lista-precios"
            element={
              <>
                <ListaPrecio />
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
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
