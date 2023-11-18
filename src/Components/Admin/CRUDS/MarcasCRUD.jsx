import { useState, useEffect } from 'react';
import { getAllMarcas, deleteMarca } from '../../../Functions/MarcasFunctions';
import MarcasPopUp from './MarcasCRUD_popup';
import { Col, Button } from 'react-bootstrap';

const MarcasCRUD = () => {
  //#region Declaracion useState's
  const [marcas, setMarcas] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState(null);
  //#endregion

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    try {
      const marcasRespone = await getAllMarcas();
      setMarcas(marcasRespone.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //#endregion
  
  const openPopup = (marca) => {
    setSelectedMarca(marca);
    setPopUp(true);
  };
  //#endregion

  //#region Handle elminar cliente
  const handleDelete = async (idMarca) => {
    try{
      const response = await deleteMarca(idMarca)
      console.log('Usuario eliminado', response)
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
          Crear Marca
        </Button>
        <ul className="list-group mt-3">
          {marcas.map((marca) => (
            <li
              key={marca.id}
              className="list-group-item d-flex justify-content-between"
            >
              {marca.nombre} 
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(marca)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(marca.id)}>
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
          <MarcasPopUp 
          marca={selectedMarca} 
          onClienteUpdated={() => fetchData()}
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

export default MarcasCRUD;
