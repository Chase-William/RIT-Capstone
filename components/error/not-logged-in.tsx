import { Card, Container, Text, Button, Row } from "@nextui-org/react";
import Link from "next/link";

export default function NotLoggedIn() {
  return (
    <Container css={{
      height: "100vh",
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Card css={{ mw: "330px", mh: '330px' }}>
        <Card.Header>
          <Text b>You've been logged out!</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <Text>
            It appears you are no longer logged in, click the login button below to 
            head over to our login page.
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="center">
            <Link href='/'>Login</Link>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}