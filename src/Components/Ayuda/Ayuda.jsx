import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import visualizador from '../../Images/ayuda-visualizador.webp'
import mayorista from '../../Images/ayudamayorista.jpg'
import reventa from '../../Images/precio-reventa.jpg'
import preciomayorista from '../../Images/precio-mayorista.jpg'
import ocultar from '../../Images/precio-ocultar.jpg'
import configurarvisualizacion from '../../Images/opcion-configurarvisualizacion.jpg'
import micuenta from '../../Images/opcion-micuenta.jpg'
import contacto from '../../Images/opcion-contacto.jpg'
import menu from '../../Images/menu-desplegable.jpg'
import contrasenia from '../../Images/ayuda-contrasenia2.jpg'

const Ayuda = () => {
  return (
    <>
      <Row className="justify-content-center py-5">
        <Col xs={11} sm={10} md={8} lg={7} className="mb-3">
          <h1 className="fw-bold">Centro de ayuda</h1>
          <p>
            En esta sección se encuentra las respuestas a las preguntas más
            frecuentes:
          </p>
          <ol>
            <li className="mb-2 fw-semibold fs-5 text-primary">
              <a href="#primero" className="text-primary">
                Cómo mostrar los precios en el catálogo
              </a>
            </li>
            <li className="mb-2 fw-semibold fs-5 text-primary">
              <a href="#segundo" className="text-primary">
                Estado de suscripción
              </a>
            </li>
            <li className="mb-2 fw-semibold fs-5 text-primary">
              <a href="#tercero" className="text-primary">
                Preguntas frecuentes
              </a>
            </li>
          </ol>
        </Col>
        <Col xs={11} sm={10} md={8} lg={7} className="my-3">
          <h2 className="fw-bold mb-3" id="primero">
            1. Cómo mostrar los precios en el catálogo
          </h2>
          <p>
            Para mostrar los precios en el catálogo primero deberás ingresar a
            la opción{' '}
            <Link
              to={'/configurar-visualizacion'}
              className="fw-bold text-primary"
            >
              <Image src={configurarvisualizacion} fluid />
            </Link>{' '}
            en el menú desplegable <Image src={menu} fluid />. El visualizador
            ofrece tres configuraciones:
          </p>
          {/* <Image src={visualizador} className="mb-4" fluid /> */}
          <div className="my-5">
            <h3 className="fw-bold">Mostrar precio mayorista</h3>
            <Image
              src={preciomayorista}
              className="my-4 d-block mx-auto"
              fluid
            />
            <p>
              Permite al <em>revendedor</em>{' '}
              <strong>ver los precios mayoristas de los productos. </strong>
              Esto es útil para poder ver <strong>el costo</strong> de los
              productos.
            </p>
            <p>
              Para{' '}
              <strong>
                prevenir que los <em>clientes</em> de los <em>revendedores</em>{' '}
                vean el precio mayorista
              </strong>{' '}
              se mostrará tanto en el inicio como en el catálogo un mensaje de
              alerta recordando que los precios mayoristas se están mostrando.
            </p>
            <Image src={mayorista} className="my-4 d-block mx-auto" fluid />
            <p>
              Para ocultar los precios se puede hacer click en el link del
              mensaje de alerta o en el visualizador de precios.
            </p>
          </div>
          <div className="my-5">
            <h3 className="fw-bold">Mostrar precio de revendor</h3>
            <p>
              Esta opción <strong>calcula y muestra</strong> los precios de
              reventa en el catálogo digital.
            </p>
            <Image src={reventa} className="my-4 d-block mx-auto" fluid />
            <p>
              Para eso el <em>revendedor</em> debe indicar{' '}
              <strong>
                un porcentaje de ganancia por sobre el producto mayorista
              </strong>
              . Así, por ejemplo, si el usuario indica un porcentaje de ganancia
              de 50% un producto de $1000 indicará en el catálogo que cuesta
              $1500. Esto permite a los <em>revendedores</em> mostrarles los
              precios de los productos a sus <em>clientes</em> de una manera más
              profesional.
            </p>
          </div>
          <div className="my-5">
            <h3 className="fw-bold">Ocultar precios</h3>
            <p>
              Esta opción oculta todos los precios en el catálogo, tanto
              mayoristas como minoristas.
            </p>
            <Image src={ocultar} className="my-4 d-block mx-auto" fluid />
          </div>
          <div className="my-5">
            <h2 className="fw-bold mb-3" id="segundo">
              2. Estado de suscripción
            </h2>
            <p>
              Consulta el estado de tu suscripción accediendo a la opción{' '}
              <Link to={'/mi-cuenta'} className="fw-bold text-primary">
                <Image src={micuenta} fluid />
              </Link>{' '}
              en el menú desplegable <Image src={menu} fluid />. En la sección
              de suscripción encontrarás:
            </p>
            <ul>
              <li>
                <strong>Inicio y vencimiento:</strong> Fecha de inicio y
                vencimiento de tu suscripción.
              </li>
              <li>
                <strong>Estado:</strong> Indica si tu cuenta está activa o
                inactiva.
              </li>
            </ul>
            <p>
              Ante cualquier duda o inconveniente puedes escribirnos en la
              casilla de mensajes de la sección de{' '}
              <Link to={'/contacto'} className="fw-bold text-primary">
                <Image src={contacto} fluid />
              </Link>{' '}
              para comunicarte directamente con{' '}
              <strong>servicio técnico</strong>.
            </p>
          </div>
          <div className="my-5">
            {' '}
            <h2 className="fw-bold mb-3 mt-5" id="tercero">
              3. Preguntas frecuentes
            </h2>
            <p>Respuestas rápidas a las consultas más comunes.</p>
            <h3 className="fw-bold">¿Cómo cambio mi contraseña?</h3>
            <p>
              Para cambiar la contraseña debes ingresar a la opción{' '}
              <Link to={'/mi-cuenta'} className="fw-bold text-primary">
                <Image src={micuenta} fluid />
              </Link>{' '}
              del menú desplegable <Image src={menu} fluid />.
            </p>
            <p>
              Una vez dentro en la parte inferior se encuentra la opción de{' '}
              <strong>¿Necesitas cambiar la contraseña?</strong>. Al hacerle
              click se abrirá un formulario para completar.
            </p>
            <Image src={contrasenia} className="my-4 d-block mx-auto" fluid />
            <p>
              Una vez finalizado solo resta clickear en el botón de{' '}
              <strong>Cambiar</strong> para poder aplicar los cambios.
            </p>
            <h3 className="fw-bold">¿Qué hacer si mi cuenta está inactiva?</h3>
            <p>
              Si tu cuenta está <strong>inactiva</strong> revisa si tu
              suscripción ha vencido. Por el momento las suscripciones sólo se
              pueden renovar en nuestro local.
            </p>
            <h3 className="fw-bold">Otras preguntas</h3>
            <p>
              Ante cualquier duda o inconveniente puedes escribirnos en la
              casilla de mensajes de la sección de{' '}
              <Link to={'/contacto'} className="fw-bold text-primary">
                <Image src={contacto} fluid />
              </Link>
              .
            </p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Ayuda
