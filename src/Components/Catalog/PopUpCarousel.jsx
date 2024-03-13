import { useState, useEffect } from 'react'
import { Modal, Button, Carousel, Image, Ratio } from 'react-bootstrap'

import { getImagenesPorProducto } from '../../Functions/ProductosFunctions'

const PopUpCarousel = ({ producto, closePopUp }) => {
  const baseUrl = import.meta.env.VITE_NAME
  const [imagenesCarousel, setImagenesCarousel] = useState(null)

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

  return (
    <Modal show={true} onHide={closePopUp}>
      <Modal.Header className="border-0 bg-primario text-white" closeButton>
        <Modal.Title>{producto && producto.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Carousel>
          {producto && (
            <Carousel.Item>
              <Ratio aspectRatio="1x1">
                <Image
                  src={baseUrl + producto.rutaImagen}
                  alt={producto.nombre}
                  fluid
                />
              </Ratio>
            </Carousel.Item>
          )}
          {imagenesCarousel ? (
            imagenesCarousel.map((imagen, index) => (
              <Carousel.Item key={index}>
                <Image
                  src={baseUrl + '/' + imagen.rutaImagen}
                  alt={imagen.rutaImagen}
                  fluid
                  className="d-block mx-auto"
                />
              </Carousel.Item>
            ))
          ) : (
            <></>
          )}
        </Carousel>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-start texto-14">
        <p>
          <em>{producto.descripcion}</em>
        </p>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUpCarousel
