import { useState, useEffect } from 'react'
import { Modal, Carousel, Image, Ratio } from 'react-bootstrap'

import { getImagenesPorProducto } from '../Functions/ProductosFunctions'

import { PiXBold, PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi'

import { Boton } from '../ui'

const PopUpCarousel = ({ producto, closePopUp, showGanancia, ganancia }) => {
  const [imagenesCarousel, setImagenesCarousel] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const fetchImagenes = async () => {
    try {
      const response = await getImagenesPorProducto(producto.id)
      setImagenesCarousel(response.data)
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    fetchImagenes()
  }, [])

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex)
  }

  const totalImages = producto
    ? 1 + (imagenesCarousel ? imagenesCarousel.length : 0)
    : 0

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Body className="p-0 rounded-top overflow-hidden position-relative">
        <Carousel
          fade={true}
          activeIndex={currentIndex}
          onSelect={handleSelect}
          prevIcon={
            currentIndex > 0 && (
              <span
                aria-hidden="true"
                className="carousel-control-prev-icon d-flex justify-content-center align-items-center text-dark bg-white bg-gradient rounded-5"
              >
                <PiCaretLeftBold />
              </span>
            )
          }
          nextIcon={
            currentIndex < totalImages - 1 && (
              <span
                aria-hidden="true"
                className="carousel-control-next-icon d-flex justify-content-center align-items-center text-dark bg-white bg-gradient rounded-5"
              >
                <PiCaretRightBold />
              </span>
            )
          }
        >
          {producto && (
            <Carousel.Item>
              <Ratio aspectRatio="1x1">
                <Image
                  src={producto.rutaImagen}
                  alt={producto.nombre}
                  className="d-block mx-auto object-fit-cover"
                  fluid
                />
              </Ratio>
            </Carousel.Item>
          )}
          {imagenesCarousel &&
            imagenesCarousel.map((imagen, index) => (
              <Carousel.Item key={index}>
                <Ratio aspectRatio="1x1">
                  <Image
                    src={imagen.rutaImagen}
                    alt={imagen.rutaImagen}
                    fluid
                    className="d-block mx-auto object-fit-cover"
                  />
                </Ratio>
              </Carousel.Item>
            ))}
        </Carousel>
        <Boton
          onClick={closePopUp}
          className="position-absolute top-0 end-0 py-2 px-2 me-2 mt-2 bg-white text-dark z-3 rounded-5 d-flex justify-content-center align-items-center"
        >
          <PiXBold />
        </Boton>
      </Modal.Body>
      <Modal.Footer className="border-0 flex-column align-items-start">
        {producto.marca && (
          <p
            className="mt-0 bg-primary bg-gradient text-white fw-semibold position-absolute top-0 start-0 z-3 ms-2 px-2 py-1 rounded-2 rounded-top-0 shadow-sm"
            style={{ letterSpacing: '.25px' }}
          >
            {producto.marca}
          </p>
        )}
        <h4 className="mb-0 fw-bold text-dark">{producto.nombre}</h4>
        {producto.descripcion && (
          <p className="fst-italic" style={{ lineHeight: '1.3' }}>
            {producto.descripcion}
          </p>
        )}
        {producto.tallas
          .filter((talla) => talla.stock == 1)
          .map((talla, index) => (
            <div
              key={index}
              className="d-flex justify-content-between my-1 w-100"
            >
              <div className="d-flex justify-content-center flex-column">
                {talla.talla_nombre && (
                  <p className="fw-semibold mb-0">{talla.talla_nombre}</p>
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
      </Modal.Footer>
    </Modal>
  )
}

export default PopUpCarousel
