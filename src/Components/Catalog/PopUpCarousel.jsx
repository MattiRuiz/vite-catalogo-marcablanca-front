import { useState, useEffect } from 'react'
import { Modal, Carousel, Image, Ratio, Badge, Button } from 'react-bootstrap'

import { getImagenesPorProducto } from '../../Functions/ProductosFunctions'

const PopUpCarousel = ({ producto, closePopUp }) => {
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
      <Modal.Body className="p-0 rounded-top overflow-hidden position-relative">
        <Carousel>
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
          className="position-absolute top-0 end-0"
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            color: '#222',
            border: 'none',
            zIndex: 999,
          }}
        >
          <span className="material-symbols-outlined">close</span>
        </Button>
      </Modal.Body>
      <Modal.Footer className="border-0 flex-column align-items-start">
        <Badge>{producto.marcas.nombre}</Badge>
        <h4 className="mb-0">{producto.nombre}</h4>
        <p>
          <em>{producto.descripcion}</em>
        </p>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUpCarousel
