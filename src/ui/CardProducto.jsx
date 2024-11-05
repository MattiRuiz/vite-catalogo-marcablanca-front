import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Ratio, Card } from 'react-bootstrap'

import PopUpCarousel from './PopUpCarousel'

function CardProducto({ producto, showGanancia, ganancia }) {
  const [popUpCarrusel, setPopUpCarrusel] = useState(false)

  return (
    <>
      <Link onClick={() => setPopUpCarrusel(true)}>
        <Card className="mb-3 h-100">
          <Ratio
            aspectRatio="1x1"
            className="fondo-imagen position-relative rounded-2  rounded-bottom-0"
          >
            {producto.rutaImagen ? (
              <Card.Img
                className="object-fit-cover rounded-2 rounded-bottom-0"
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
              className="mb-0 bg-primary bg-gradient text-white fw-semibold position-absolute top-0 start-0 z-3 ms-2 px-2 py-1 rounded-2 rounded-top-0 shadow-sm"
              style={{ letterSpacing: '.25px' }}
            >
              {producto.marca}
            </p>
          )}
          <Card.Body className="pb-0">
            <Card.Title className="fw-bold mb-2 fs-5">
              {producto.nombre}
            </Card.Title>
            <Card.Subtitle
              className="text-muted mb-2 fst-italic"
              style={{ lineHeight: '1.3' }}
            >
              {producto.descripcion}
            </Card.Subtitle>
            {producto.tallas.map((talla, index) => (
              <div
                key={index}
                className="d-sm-flex justify-content-between my-1"
              >
                <div className="d-flex justify-content-center flex-column">
                  {talla.talla_nombre && (
                    <p className="fw-semibold mb-0 lh-sm">
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
          showGanancia={showGanancia}
          ganancia={ganancia}
        />
      )}
    </>
  )
}

export default CardProducto
