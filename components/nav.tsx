import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { useUser } from "../lib/userUser";
import { User } from "../pages/api/user";
import { ADMIN_ROLE, PROF_ROLE, STUDENT_ROLE } from "../lib/util";
import { NextRouter, useRouter } from "next/router";

const INDEX_PATHNAME = '/'

function renderUserLinks(router: NextRouter, user: User | null) {
  if (!user || router.pathname === INDEX_PATHNAME)
    return <></>

  // Custom Admin Routing
  if (user.role == ADMIN_ROLE) {
    return (
      <Navbar.Link isActive href="accounts">Dashboard</Navbar.Link>
    )
  }

  // Custom Prof Routing
  if (user.role == PROF_ROLE) {
    return (
      <Navbar.Link isActive href="courses">Dashboard</Navbar.Link>
    )
  }
}

function renderGeneralLinks(router: NextRouter, user: User | null) {
  // User is not logged in
  if (!user || user?.isLoggedIn === false) {
    return (
      <Button auto flat as={Link} href="/student-help-form">
        Student Help Form
      </Button>
    )
  }

  if (user.role === STUDENT_ROLE) {
    <Button auto flat as={Link} href="/student-help-form">
      Student Help Form
    </Button>
  }

  return <></>
}

export default function Nav() {
  const user = useUser()
  const router = useRouter()

  return (
    <Navbar isCompact isBordered variant="sticky">
      <Navbar.Brand>
        <Button auto flat as={Link} color="inherit" hideIn="xs" href="/">
          RAWRS
        </Button>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        {renderUserLinks(router, user)}
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          {renderGeneralLinks(router, user)}
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  )
}