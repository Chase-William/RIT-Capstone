import NotLoggedIn from "../../components/error/not-logged-in";
import prisma from "../../lib/prisma";
import superjson from 'superjson';
import { useUser } from "../../lib/userUser";
import Layout from "../../components/layout";
import CourseLayout from '../../components/courseLayout'
import StandardLayout from "../../components/standard-layout";
import Acquisitions from "../../components/acqusitions";
import Logins, { defaultLoginHeaderAdapter, defaultLoginRowAdapter } from "../../components/logins";
import { AcquisitionAttempt, LoginAttempt, StudentHelpRequest, Student as StudentModel } from "@prisma/client";
import { Container, Table, Text } from "@nextui-org/react";
import { Button, Card, Row } from "@nextui-org/react";
import { CSVLink, CSVDownload } from "react-csv";
import { post } from "../../lib/fetch-wrapper";
import { useState } from "react";

export async function getServerSideProps({ params }: { params: { hid: string } }) {
  const result = await prisma.studentHelpRequest.findUnique({
    where: {
      id: parseInt(params.hid)
    }
  })

  return {
    props: {
      data: superjson.serialize(result)
    }, // will be passed to the page component as props
  }
}

export default function StudentHelpDescription({ data }) {
  const user = useUser()

  const [resolved, setIsResolved] = useState(false)

  if (!user?.isLoggedIn)
    return <NotLoggedIn />

  const request = superjson.deserialize<StudentHelpRequest>(data)

  return (
    <Layout>
      <Container xl css={{
        maxW: '800px'
      }}>
        <Container css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text h4><a target='_blank' href={"https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" + request.email + "&su=Trouble Accessing Resources"}>{request.email}</a></Text>
          <Text h5>{request.create.toUTCString()}</Text>
        </Container>
        <Text>{request.description}</Text>
        {resolved ?
          <Text h3 color="success" css={{
            margin: '0 auto'
          }}>Resolved</Text>
          :
          <Button css={{
            margin: '10px 0 auto auto'
          }}
            onPress={() => {
              request.isResolved = true
              setIsResolved(true)
                ;
              (async () => {
                await post('/api/student-help-form', {
                  code: 'update',
                  request: request
                })
              })()
            }}>
            Resolve
          </Button>
        }
      </Container>
    </Layout>
  );
}