import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Terminos = () => {
  return (
    <Row className="justify-content-center justify-content-md-around align-items-center alto-container py-5">
      <Col xs={11} sm={8}>
        <h5 className="fw-bold text-muted">Catálogo Digital Marca Blanca</h5>
        <h1 className="display-3 fw-bold lh-1">
          Términos y Condiciones de Uso
        </h1>
        <p className="fst-italic">Última actualización: 13/08/2024</p>
        <p>
          Estos términos y condiciones (los "Términos") regulan el uso del
          catálogo digital Marca Blanca ("Catálogo") proporcionado por la
          empresa mayorista textil Marca Blanca ("Empresa"), ubicada en San Luis
          1927, Rosario, Santa Fe. Al utilizar el Catálogo, usted acepta cumplir
          con estos Términos.
        </p>
        <h3 className="fw-bold mt-4 mb-3">1. Uso del Catálogo</h3>
        <p>
          El Catálogo está destinado exclusivamente para su uso en la relación
          comercial entre nuestros revendedores ("Revendedores") y sus clientes.
          Cualquier otro uso está estrictamente prohibido y puede resultar en la
          suspensión o terminación de la cuenta del Revendedor involucrado.
        </p>
        <h3 className="fw-bold mt-4 mb-3">
          2. Precios y Disponibilidad de Productos
        </h3>
        <ol>
          <li className="mb-3">
            <strong>Precios:</strong> Los precios publicados en el Catálogo son
            meramente referenciales y están sujetos a cambios sin previo aviso.
            En caso de discrepancia entre el precio del Catálogo y el precio
            ofrecido directamente por la Empresa, prevalecerá el precio de la
            Empresa.
          </li>
          <li>
            <strong>Disponibilidad de Productos:</strong> La disponibilidad de
            los productos puede variar y no está garantizada. Las imágenes de
            los productos en el Catálogo son ilustrativas y pueden no
            representar exactamente al producto ofrecido.
          </li>
        </ol>
        <h3 className="fw-bold mt-4 mb-3">3. Responsabilidad del Revendedor</h3>
        <p>
          La Empresa no se responsabiliza por las acciones de los Revendedores
          hacia sus clientes. Los Revendedores son responsables de sus
          actividades comerciales y deberán garantizar la veracidad y la
          transparencia en sus tratos con sus clientes. La Empresa actúa
          únicamente como proveedor del Catálogo y de los productos.
        </p>
        <h3 className="fw-bold mt-4 mb-3">4. Supervisión y Cumplimiento</h3>
        <p>
          La Empresa y la entidad encargada del mantenimiento del Catálogo se
          reservan el derecho de supervisar el uso del Catálogo. Cualquier uso
          no autorizado o sospecha de mal uso resultará en la suspensión de la
          cuenta del Revendedor implicado, pendiente de una investigación. Si se
          confirma una violación de estos Términos, la cuenta será dada de baja
          permanentemente.
        </p>
        <h3 className="fw-bold mt-4 mb-3">5. Modificaciones de los Términos</h3>
        <p>
          La Empresa se reserva el derecho de modificar estos Términos en
          cualquier momento. Las modificaciones se publicarán en el Catálogo y
          entrarán en vigor inmediatamente después de su publicación. El uso
          continuado del Catálogo constituirá la aceptación de los nuevos
          Términos.
        </p>
        <h3 className="fw-bold mt-4 mb-3">5. Modificaciones de los Términos</h3>
        <p>
          Para consultas relacionadas con estos Términos, por favor{' '}
          <Link to={'/contacto'} className="fw-bold text-primary">
            Contactenos
          </Link>
          .
        </p>
      </Col>
    </Row>
  )
}

export default Terminos
