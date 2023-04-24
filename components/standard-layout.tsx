import { Button, Card, Col, Container, Row } from '@nextui-org/react'
import utilStyles from '../styles/utils.module.css'
import { useState } from 'react';
import Modal from "react-modal";

export default function StandardLayout(
  {
    topLeft,
    topRight,
    midBottom,
    bottom
  }: {
    topLeft: JSX.Element,
    topRight: JSX.Element,
    midBottom: JSX.Element,
    bottom: JSX.Element
  }) {

  // Logic
  const [isTopRightOpen, setIsTopRightOpen] = useState(false);
  const [isTopLeftOpen, setIsTopLeftOpen] = useState(false);

  function toggleTopLeftModal(){
    setIsTopLeftOpen(!isTopLeftOpen);
  }
  function toggleTopRightModal(){
    setIsTopRightOpen(!isTopRightOpen);
  }
  

  return (
    <>
      <Container fluid>
        <Modal
          isOpen={isTopLeftOpen}
          onRequestClose={toggleTopLeftModal}
          contentLabel="Acquisition Info"
        >
          <Container xl>
            <Row css={{ marginTop: 60 }}>
              <Card>
              <Card.Header style={{ backgroundColor: '#009CBD', maxHeight: '5px' }} >
                <Button style={{ marginLeft: '88%'}}  onClick={toggleTopLeftModal}>Close</Button>
                </Card.Header>
                <Card.Body >
                  {topLeft}
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </Modal>

        <Modal
          isOpen={isTopRightOpen}
          onRequestClose={toggleTopRightModal}
          contentLabel="Acquisition Info"
        >
          <Container xl>
            <Row css={{ marginTop: 60 }}>
              <Card>
              <Card.Header style={{ backgroundColor: '#84BD00', maxHeight: '5px' }} >
              <Button style={{ marginLeft: '88%'}}  onClick={toggleTopRightModal}>Close</Button>
                </Card.Header>
                <Card.Body >
                  {topRight}
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </Modal>

        <Row css={{
          '@smMax': {
            display: 'flex',
            flexDirection: 'column'
          }
        }}>
          <Card  css={{
            maxWidth: '50%',
            '@smMax': {
              maxWidth: '100%'
            },
            '@smMin': {
              marginRight: '20px'
            }
          }}>
            <Card.Header style={{ backgroundColor: '#009CBD', maxHeight: '5px' }} />
            <Card.Body>
              <div onClick={toggleTopLeftModal}>
              {topLeft}
              </div>
            </Card.Body>
          </Card>
          <Card css={{
            maxWidth: '50%',
            '@smMax': {
              marginTop: '20px',
              maxWidth: '100%'
            }
          }}>
            <Card.Header style={{ backgroundColor: '#84BD00', maxHeight: '5px' }} />
            <Card.Body>
              <div onClick={toggleTopRightModal}>
                {topRight}
              </div>
            </Card.Body>
          </Card>
        </Row>
        <Row css={{ marginTop: 20 }}>
          <Card>
            <Card.Header style={{ backgroundColor: '#7d55c7', maxHeight: '5px' }} />
            <Card.Body>
              {midBottom}
            </Card.Body>
          </Card>
        </Row>

        <Row css={{ marginTop: 20 }}>
          <Card>
            <Card.Header style={{ backgroundColor: '#F6BE00', maxHeight: '5px' }} />
            <Card.Body>
              {bottom}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}