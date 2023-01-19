import { Navbar, Button, Link, Text } from "@nextui-org/react";

export default function Nav() {
  return (
    <Navbar isCompact isBordered variant="sticky">
      <Navbar.Brand>
        <Button auto flat as={Link} color="inherit" hideIn="xs" href="/">
          RAWRS
        </Button>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Link href="#">Features</Navbar.Link>
        <Navbar.Link isActive href="#">Customers</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          ...
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="/student-help-form">
            Student Help Form
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  )
}