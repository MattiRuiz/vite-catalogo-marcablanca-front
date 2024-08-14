import { useState, useEffect } from 'react'
import { Modal, Carousel, Image, Ratio, Button } from 'react-bootstrap'

import { getImagenesPorProducto } from '../../Functions/ProductosFunctions'

import { PiXBold, PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi'

const PopUpCarousel = ({ producto, closePopUp }) => {
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

  const showGanancia = localStorage.getItem('showGanancia')
  let ganancia = 1
  let porcentual = 1.0

  if (showGanancia == 'true') {
    const gananciaStr = localStorage.getItem('ganancia')
    ganancia = JSON.parse(gananciaStr)
    porcentual = (ganancia + 100) / 100
  }

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
                className="carousel-control-prev-icon d-flex justify-content-center align-items-center text-dark bg-white bg-gradient bg-opacity-50 rounded-5"
              >
                <PiCaretLeftBold className="" />
              </span>
            )
          }
          nextIcon={
            currentIndex < totalImages - 1 && (
              <span
                aria-hidden="true"
                className="carousel-control-next-icon d-flex justify-content-center align-items-center text-dark bg-white bg-gradient bg-opacity-50 rounded-5"
              >
                <PiCaretRightBold className="" />
              </span>
            )
          }
        >
          {producto && (
            <Carousel.Item>
              <Ratio aspectRatio="4x3">
                <Image
                  src={producto.rutaImagen}
                  alt={producto.nombre}
                  className="d-block mx-auto object-fit-cover"
                  fluid
                />
              </Ratio>
            </Carousel.Item>
          )}
          {imagenesCarousel ? (
            imagenesCarousel.map((imagen, index) => (
              <Carousel.Item key={index}>
                <Ratio aspectRatio="4x3">
                  <Image
                    src={imagen.rutaImagen}
                    alt={imagen.rutaImagen}
                    fluid
                    className="d-block mx-auto object-fit-cover"
                  />
                </Ratio>
              </Carousel.Item>
            ))
          ) : (
            <></>
          )}
        </Carousel>
        <Button
          onClick={closePopUp}
          className="position-absolute top-0 end-0 py-2 px-2 me-2 mt-2 bg-white opacity-75 text-dark border-0 z-3 rounded-5 d-flex justify-content-center align-items-center bg-gradient bg-opacity-50"
        >
          <PiXBold className="" />
        </Button>
      </Modal.Body>
      <Modal.Footer className="border-0 flex-column align-items-start">
        {producto.marcas.nombre === 'Otros' ? (
          ''
        ) : (
          <p
            className="mb-0 bg-primary bg-gradient text-white fw-semibold position-absolute top-0 start-0 z-3 mt-2 ms-2 px-2 py-0 rounded-2 shadow-sm"
            style={{ letterSpacing: '.25px' }}
          >
            {producto.marcas.nombre}
          </p>
        )}
        <h4 className="mb-0">{producto.nombre}</h4>
        <p>
          <em>{producto.descripcion}</em>
        </p>
        {producto.tallas
          .filter((talla) => talla.stock == 1)
          .map((talla, index) => (
            <div key={index}>
              <div className="d-flex justify-content-between gap-2 mb-1">
                <div className="d-flex justify-content-center flex-column">
                  {talla.nombre && (
                    <p className="fw-bold text-uppercase mb-0">
                      {talla.nombre}
                    </p>
                  )}
                  <p className="mb-0"> {talla.dimensiones}</p>
                </div>
                <div>
                  {showGanancia == 'true' ? (
                    <div className="">
                      <p className="fw-bold mb-0">
                        ${Math.trunc(parseInt(talla.precio) * porcentual)}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
      </Modal.Footer>
    </Modal>
  )
}

export default PopUpCarousel
