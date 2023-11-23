import { Col, Placeholder, Ratio, Card } from 'react-bootstrap'

function CardLoading() {
  return (
    <>
      <Col xs={12} md={6} lg={4} xl={3} className="mb-2">
        <Card className="mb-3 h-100">
          <Ratio aspectRatio="4x3">
            <Placeholder as={Card.Img} className="fondo-imagen" />
          </Ratio>
          <Card.Body className="pb-0">
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
            <Placeholder as={Card.Subtitle} animation="glow" className="pb-3">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
              <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
              <Placeholder xs={8} />
            </Placeholder>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default CardLoading
