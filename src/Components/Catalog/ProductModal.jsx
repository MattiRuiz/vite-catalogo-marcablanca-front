import { useState, useEffect } from 'react';
import { Modal, Image, Button } from 'react-bootstrap';
import { getAllProductoImages } from '../../Functions/ProductosFunctions';

function ProductModal({ selectedProduct }) {
  const baseUrl = import.meta.env.VITE_NAME

  const [productImages, setProductImages] = useState([]);
  const [modalShow, setModalShow] = useState(true);

  useEffect(() => {
    setModalShow(true)
    const fetchProductImages = async () => {
      try {
        const images = await getAllProductoImages(selectedProduct.id);
        setProductImages(images.data);
      } catch (error) {
        console.error('Error fetching product images:', error);
      }
    };

    if (selectedProduct) {
      fetchProductImages();
    }
  }, [selectedProduct]);

  return (
    <div >
      {modalShow === true ? 
      <>
      <Modal.Header >
        {selectedProduct && (
          <>
            {selectedProduct.id + "\t"}
            {selectedProduct.nombre}
          </>
        )}
      </Modal.Header>
      <Modal.Body>
        {productImages.map((image, index) => (
          <Image
            key={index}
            src={baseUrl + "/" +  image.rutaImagen}
            alt={selectedProduct.nombre}
            fluid
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalShow(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
      </>
    :
    <></>  
    }
    </div>
  );
}

export default ProductModal;
