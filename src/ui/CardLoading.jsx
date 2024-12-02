import { Col, Placeholder, Ratio, Card } from 'react-bootstrap'

function CardLoading() {
  return (
    <>
      <Col xs={12} sm={6} md={4} className="mb-4">
        <Card className="mb-3 h-100 border-0">
          <Ratio aspectRatio="4x3" className="rounded-3">
            <Placeholder as={Card.Img} className="fondo-imagen rounded-3" />
          </Ratio>
          <Card.Body className="pb-0 px-2 pt-2">
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
            <Placeholder
              as={Card.Subtitle}
              animation="glow"
              className="text-muted fst-italic"
            >
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow" className="mb-0">
              <Placeholder xs={3} /> <Placeholder xs={4} />{' '}
            </Placeholder>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default CardLoading
