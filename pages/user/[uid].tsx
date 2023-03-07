import prisma from "../../lib/prisma"
import superjson from 'superjson';
import { Course } from "@prisma/client";
import NotLoggedIn from "../../components/error/not-logged-in";
import { useUser } from "../../lib/userUser";
import Layout from "../../components/layout";
import { Button, Container, Input, Table, Text } from "@nextui-org/react";
import { useState } from "react";
import Courses from "../../components/courses";
import React from "react";

export type UserWithoutPassword = {
  username: string
  email: string
  id: number
  role: string
  courses: Course[]
}

type ServerSideProps = {
  account: UserWithoutPassword
  courses: Course[]
}

export async function getServerSideProps({ params }: { params: { uid: string } }) {
  const account = await prisma.user.findUnique({
    where: {
      id: parseInt(params.uid)
    },
    select: {
      username: true,
      email: true,
      id: true,
      role: true,
      courses: true
    }
  })

  const courses = await prisma.course.findMany()

  return {
    props: {
      data: superjson.serialize({
        account: account,
        courses: courses
      })
    }, // will be passed to the page component as props
  }
}

export default function User({ data }) {
  const user = useUser()

  const root = superjson.deserialize<ServerSideProps>(data)
  const account = root.account

  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(account.username)
  const [email, setEmail] = useState(account.email)
  const [professorCourses, setProfessorCourses] = useState(account.courses)
  const [otherCourses, setOtherCourses] = useState(root.courses)

  const leftRef = React.useRef()
  const rightRef = React.useRef()

  // selection state acts as a toggle for the UI disabling or enabling the "add" or "remove"
  // buttons when selecting courses from a list
  const [selectionState, setSelectionState] = useState<boolean>(null)

  const handleProfessorCourseSelected = (e: { currentKey: string}) => {
    console.log(rightRef.current)
    //rightRef.current.selectedKeys = new Set<React.Key>()
    setSelectionState(true)
  }

  const handleCoursePoolCourseSelected = (e: { currentKey: string }) => {
    //leftRef.current.selectedKeys = new Set<React.Key>()
    setSelectionState(false)
  }

  if (!user?.isLoggedIn)
    return <NotLoggedIn />

  if (isEditing)
    return (
      <Layout>
        <Container
          css={{
            maxWidth: '800px'
          }}
        >
          <Text h5>Username</Text>
          <Input value={username} onChange={(e => setUsername(e.target.value))} />
          <Text h5 css={{ marginTop: '20px' }}>Email</Text>
          <Input value={email} onChange={(e => setUsername(e.target.value))} />
          <Container css={{
            marginTop: '10px',
            padding: '0',
            justifyContent: 'start',
            display: 'flex',
            gap: '10px'
          }}>
            <Button>Save</Button>
            <Button onClick={() => {
              setIsEditing(false)
              setUsername(account.username)
              setEmail(account.email)
            }}>Cancel</Button>
          </Container>
        </Container>
        <Container css={{
          maxWidth: '1000px',
          display: 'flex'
        }}>
          <Table
            ref={leftRef}
            selectionMode="single"
            shadow={false}
            //@ts-ignore
            onSelectionChange={handleProfessorCourseSelected}>
            <Table.Header>
              <Table.Column>Id</Table.Column>
              <Table.Column>Name</Table.Column>
            </Table.Header>
            <Table.Body>
              {professorCourses.map((course) =>
                <Table.Row key={course.id}>
                  <Table.Cell>{course.id}</Table.Cell>
                  <Table.Cell>{course.name}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <Container css={{
            maxWidth: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            rowGap: '10px'
          }}>
            <Button size={"sm"} disabled={selectionState || selectionState === null}>Add</Button>
            <Button size={"sm"} disabled={!selectionState}>Remove</Button>
          </Container>
          <Table
            ref={rightRef}
            selectionMode="single"
            shadow={false}            
            //@ts-ignore
            onSelectionChange={handleCoursePoolCourseSelected}>
            <Table.Header>
              <Table.Column>Id</Table.Column>
              <Table.Column>Name</Table.Column>
            </Table.Header>
            <Table.Body>
              {otherCourses.map((course) =>
                <Table.Row key={course.id}>
                  <Table.Cell>{course.id}</Table.Cell>
                  <Table.Cell>{course.name}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Container>
      </Layout>
    )

  return (
    <Layout>
      <Container
        css={{
          maxWidth: '800px'
        }}
      >
        <Text>Username: {account.username}</Text>
        <Text>Email: {account.email}</Text>
        <Text>Role: {account.role}</Text>
        <Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>
      </Container>
      <Container>
        <Courses courses={professorCourses} />
      </Container>
    </Layout>
  )
}