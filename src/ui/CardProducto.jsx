import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Ratio, Card } from 'react-bootstrap'

import PopUpCarousel from './PopUpCarousel'

function CardProducto({ producto, showGanancia, ganancia }) {
  const [popUpCarrusel, setPopUpCarrusel] = useState(false)

  return (
    <>
      <Link onClick={() => setPopUpCarrusel(true)}>
        <Card className="mb-3 h-100 border-0">
          <Ratio
            aspectRatio="4x3"
            className="fondo-imagen position-relative rounded-3 shadow"
          >
            {producto.rutaImagen ? (
              <Card.Img
                className="object-fit-cover rounded-3"
                alt={producto.nombre}
                variant="top"
                src={producto.rutaImagen}
                onError={() => handleImageError(producto.id)}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <p className="mb-0 color-grisclaro">
                  <strong>Sin imágen</strong>
                </p>
              </div>
            )}
          </Ratio>
          {producto.marca === 'Otros' ? (
            ''
          ) : (
            <p
              className="mb-0 bg-primary bg-gradient text-white fw-semibold position-absolute top-0 start-0 z-3 mt-2 ms-2 px-2 py-0 rounded-2 shadow-sm"
              style={{ letterSpacing: '.25px' }}
            >
              {producto.marca}
            </p>
          )}
          <Card.Body className="pb-0 px-0 pt-2">
            <Card.Title className="fw-semibold mb-2">
              {producto.nombre}
            </Card.Title>
            <Card.Subtitle
              className="text-muted mb-1 fst-italic"
              style={{ lineHeight: '1.3' }}
            >
              {producto.descripcion}
            </Card.Subtitle>
            {producto.tallas.map((talla, index) => (
              <div
                key={index}
                className="d-flex justify-content-between gap-2 mb-1"
              >
                <div className="d-flex justify-content-center flex-column">
                  {talla.talla_nombre && (
                    <p className="fw-bold text-uppercase mb-0">
                      {talla.talla_nombre}
                    </p>
                  )}
                  {talla.dimensiones && (
                    <p className="mb-0"> {talla.dimensiones}</p>
                  )}
                </div>
                <div>
                  {showGanancia && (
                    <div>
                      <p className="fw-bold mb-0">
                        ${Math.trunc(parseInt(talla.precio) * ganancia)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Link>
      {popUpCarrusel && (
        <PopUpCarousel
          producto={producto}
          closePopUp={() => setPopUpCarrusel(false)}
        />
      )}
    </>
  )
}

export default CardProducto
