import { Card, Col, Container, Row } from '@nextui-org/react'
import utilStyles from '../styles/utils.module.css'

export default function StandardLayout(
  {
    topLeft,
    topRight,
    bottom
  }: {
    topLeft: JSX.Element,
    topRight: JSX.Element,
    bottom: JSX.Element
  }) {

  // Logic

  return (
    <>
      <Container fluid>
        <Row css={{
          '@smMax': {
            display: 'flex',
            flexDirection: 'column'
          }
        }}>
          <Card css={{
            maxWidth: '50%',
            '@smMax': {
              maxWidth: '100%'
            },
            '@smMin': {
              marginRight: '20px'
            }
          }}>
            <Card.Header style={{ backgroundColor:'#009CBD', maxHeight: '5px'}}/>
            <Card.Body>
              {topLeft}
            </Card.Body>
          </Card>
          <Card css={{
            maxWidth: '50%',
            '@smMax': {
              marginTop: '20px',
              maxWidth: '100%'
            }
          }}>
            <Card.Header style={{ backgroundColor:'#84BD00', maxHeight: '5px'}}/>
            <Card.Body>
              {topRight}
            </Card.Body>
          </Card>
        </Row>
        <Row css={{ marginTop: 20 }}>
          <Card>
          <Card.Header style={{ backgroundColor:'#F6BE00', maxHeight: '5px'}}/>
            <Card.Body>
              {bottom}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}