import NotLoggedIn from "../../components/error/not-logged-in";
import prisma from "../../lib/prisma";
import superjson from 'superjson';
import { useUser } from "../../lib/userUser";
import Layout from "../../components/layout";
import StandardLayout from "../../components/standard-layout";
import Acquisitions from "../../components/acqusitions";
import Logins, { defaultLoginHeaderAdapter, defaultLoginRowAdapter } from "../../components/logins";
import { AcquisitionAttempt, LoginAttempt, Student as StudentModel } from "@prisma/client";
import { Container, Table, Text } from "@nextui-org/react";

export async function getServerSideProps({ params }: { params: { sid: string } }) {
  const result = await prisma.student.findUnique({
    where: {
      id: parseInt(params.sid)
    },
    include: {
      acquisitions: {
        where: {
          status: false
        }
      },
      logins: {
        where: {
          status: false
        }
      }
    }
  })

  return {
    props: {
      data: superjson.serialize(result)
    }, // will be passed to the page component as props
  }
}

export default function Student({ data }) {
  const user = useUser()

  if (!user?.isLoggedIn)
    return <NotLoggedIn />

  const student = superjson.deserialize<StudentModel & {
    acquisitions: AcquisitionAttempt[];
    logins: LoginAttempt[];
  }>(data)

  return (
    <Layout>
      <StandardLayout
        topLeft={
          <Acquisitions
            acquisitions={student.acquisitions}
            headerAdapter={() => {
              return (
                <Table.Header>
                  <Table.Column>Id</Table.Column>
                  <Table.Column>Http Code</Table.Column>
                  <Table.Column>Start</Table.Column>
                  <Table.Column>Finish</Table.Column>
                </Table.Header>
              )
            }}
            rowAdapter={(v: AcquisitionAttempt) => {
              return (
                <Table.Row key={v.id}>
                  <Table.Cell>{v.id}</Table.Cell>
                  <Table.Cell>{v.http_code}</Table.Cell>
                  <Table.Cell>{v.start_time.toUTCString()}</Table.Cell>
                  <Table.Cell>{v.finished_time.toUTCString()}</Table.Cell>
                </Table.Row>
              )
            }}
            title="Failed Resource Acquisitions"
          />
        }
        topRight={
          <Logins
            handleSelection={null}
            title="Failed Logins"
            logins={student.logins}
            headerAdapter={defaultLoginHeaderAdapter}
            rowAdapter={defaultLoginRowAdapter} />
        }
        bottom={
          <Container fluid>
            <Text h4>Name:</Text><Text>{`${student.last_name}, ${student.first_name}`}</Text>
            <Text h4>Email:</Text><Text>{student.email}</Text>
          </Container>
        }
      />
    </Layout>
  )
}