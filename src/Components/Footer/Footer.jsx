import { Row, Col, Image, Ratio } from 'react-bootstrap'

import imageLogo from '../../Images/logo-marca.svg'

function Footer() {
  return (
    <>
      <Row className="pb-5 pt-4 text-white bg-primario align-items-center justify-content-center">
        <Col
          xs={12}
          lg={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div style={{ width: '250px', height: 'auto' }}>
            <div className="mapouter">
              <div className="gmap_canvas">
                <Ratio aspectRatio="1x1">
                  <iframe
                    className="gmap_iframe"
                    width="100%"
                    title="Mapa de Blanqueria MarcaBlanca"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Blanqueria MarcaBlanca&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                </Ratio>
              </div>
              <style>
                .mapouter
                {'position:relative;text-align:right;width:100%;height:400px;'}
                .gmap_canvas{' '}
                {
                  'overflow:hidden;background:none!important;width:100%;height:400px;'
                }
                .gmap_iframe {'height:400px!important;'}
              </style>
            </div>
          </div>
          <div className="ms-4">
            <Image src={imageLogo} className="logo-home d-block me-auto mb-2" />
            <ul className="list-unstyled ms-2">
              <li>San Luis 1917</li>
              <li>Rosario - Santa Fe</li>
              <li>(0341) 4212690</li>
            </ul>
            <h4 className="ms-2 mb-1">Horario de atención</h4>
            <p className="ms-2">Lunes a viernes de 9:00 a 18:00hs.</p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Footer
