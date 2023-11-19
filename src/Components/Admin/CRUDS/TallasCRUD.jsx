import { useState, useEffect } from 'react';
import { getAllTallas, deleteTalla } from '../../../Functions/TallasFunctions';
import TallasPopUp from './TallasCRUD_popup';
import { Col, Button } from 'react-bootstrap';

const TallasCRUD = () => {
  //#region Declaracion useState's
  const [tallas, setTallas] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selectedTalla, setSelectedTalla] = useState(null);
  //#endregion

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    try {
      const tallasRespone = await getAllTallas();
      setTallas(tallasRespone.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //#endregion
  
  const openPopup = (marca) => {
    setSelectedTalla(marca);
    setPopUp(true);
  };
  //#endregion

  //#region Handle elminar cliente
  const handleDelete = async (idTalla) => {
    try{
      const response = await deleteTalla(idTalla)
      console.log('Talla eliminado', response)
      setPopUp(false)
    }
    catch (e)
    {
      return e.message
    }
    fetchData();
  };
  //#endregion

  return (
    <div>
      <Col xs={5}>
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear Talla
        </Button>
        <ul className="list-group mt-3">
          {tallas.map((talla) => (
            <li
              key={talla.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div className='m-0 p-0'>
                <h5>{talla.nombre}</h5> 
                <p className='m-0'>Medidas: {talla.dimensiones}</p> 
              </div>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(talla)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(talla.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Col>
        {  
        //#region Renderizado condicional PopUp
        popUp ? (
          <TallasPopUp 
          talla={selectedTalla} 
          onTallaUpdated={() => fetchData()}
          closePopUp={() => setPopUp(false)}
          />
        ) 
        : 
        (
          <>
          </>
        )
        //#endregion
        }
    </div>
  );
};

export default TallasCRUD;
