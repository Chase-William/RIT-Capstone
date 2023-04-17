import { Navbar, Button, Link, Text, Container, Table, Row, Image } from "@nextui-org/react";
import { get, post } from '../lib/fetch-wrapper';
import { useUser } from "../lib/userUser";
import { User } from "../pages/api/user";
import { ADMIN_ROLE, IT_ANALYST_ROLE, PROF_ROLE, STUDENT_ROLE } from "../lib/util";
import { NextRouter, useRouter } from "next/router";
import LogoutButton from "./logout-btn";
import { useEffect, useState } from 'react';
import { StudentHelpRequest } from '@prisma/client';

let INDEX_PATHNAME: string;

async function getStudentHelpRequest(): Promise<Array<StudentHelpRequest>> {
  return await get('/api/student-help-form', {})
    .then(data => data.requests)
}

function renderUserLinks(router: NextRouter, user: User | null) {
  const [requests, setRequests] = useState<Array<StudentHelpRequest>>([])

  useEffect(() => {
    (async () => {
      setRequests(await getStudentHelpRequest())
    })()
  }, [])


  if (!user || router.pathname === INDEX_PATHNAME)
    return <></>

  // Custom Admin Routing
  if (user.role == ADMIN_ROLE) {
    INDEX_PATHNAME = "/accounts"
    return (
      <Navbar.Link isActive href="/accounts">Dashboard</Navbar.Link>
    )
  }

  // Custom Prof Routing
  if (user.role == PROF_ROLE) {
    INDEX_PATHNAME = "/courses"
    if (window.location.pathname == "/courses") {
    return (
        [<Navbar.Link isActive href="/courses">Dashboard</Navbar.Link>,
        <Navbar.Link href="/alerts">Alerts</Navbar.Link>,
        <Navbar.Item>
        <p className="alertIcon">{requests.length}</p>
       </Navbar.Item>
      ]
      )
    } else if (window.location.pathname == "/alerts") {
      return (
        [<Navbar.Link  href="/courses">Dashboard</Navbar.Link>,
        <Navbar.Link isActive href="/alerts">Alerts</Navbar.Link>,
      ]
      )
    }
    else {
      return (
        [<Navbar.Link href="/courses">Dashboard</Navbar.Link>,
        <Navbar.Link href="/alerts">Alerts</Navbar.Link>,
        <Navbar.Item>
        <p className="alertIcon">{requests.length}</p>
       </Navbar.Item>]
      )
    }

  }
  
}

function renderGeneralLinks(router: NextRouter, user: User | null) {
  // User is not logged in
  if (!user || user?.isLoggedIn === false) {
    INDEX_PATHNAME = "/"
    return (
      <Link
        href="/student-help-form"
        color={"text"}
        css={{
          fontSize: '$xl',
          fontWeight: '$bold',
          marginRight: '5px',
          textDecoration: 'underline',
          '@xsMax': {
            color: 'Blue' // Example using Media query to alternate styles
          }
        }}>
        Student Help Form
      </Link>
    )
  }

  return (
    <></>
  )
}

export default function Nav() {
  const user = useUser()
  const router = useRouter()
  

  return (
    <>
      <Navbar className="header"
        disableShadow
        isCompact
      >
        <Image
          width={200}
          src='/RIT_hor_k.png'
          containerCss={{
            margin: 0
          }}
        />
        {user && user.isLoggedIn &&
          <LogoutButton />
        }
        {/* <Text>
          <span className={navStyles.rit}>RIT</span>
          <span className={navStyles.divider}> | </span>
          <span className={navStyles.expanded}>Rochester Institute of Technology</span>
        </Text> */}
      </Navbar>
      <Navbar isCompact variant="sticky">

        <Navbar.Brand>
          <Link
            href={INDEX_PATHNAME}
            underline
            color={"text"}
            css={{
              fontSize: '$2xl',
              fontWeight: '$bold',
              marginRight: '5px',
              marginLeft: '6px'
            }}>
            RAWRS
          </Link>
          <Text
            css={{
              fontStyle: 'italic'
            }}>
            (Recent Acquisition Web Resources)
          </Text>
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
    </>
  )
}