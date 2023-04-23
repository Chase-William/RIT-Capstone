import { useEffect, useState } from 'react';
import { get, post } from '../lib/fetch-wrapper';
import CoursesComponent from '../components/courses'
import StandardLayout from '../components/standard-layout'
import CourseLayout from '../components/courseLayout'
import Layout from '../components/layout';
import Acquisitions from '../components/acqusitions';
import Logins, { LoginWithStudentEmail } from '../components/logins';
import { AugmentedAcquisition } from '../components/acqusitions';
import { useRouter } from 'next/router';
import { useUser } from '../lib/userUser';
import { Button, Card, Container, Spacer, Table, Text } from '@nextui-org/react';
import NotLoggedIn from '../components/error/not-logged-in';
import Chart from 'react-google-charts';
import RAWRSpacer from '../components/spacer';
import { StudentHelpRequest } from '@prisma/client';
import HelpRequestTable from '../components/help-request-table';
import prisma from "../lib/prisma";
import superjson from 'superjson';


async function getStudentHelpRequest(): Promise<Array<StudentHelpRequest>> {
  return await get('/api/student-help-form', {})
    .then(data => data.requests)
}

export default function Alerts() {
  
  const [requests, setRequests] = useState<Array<StudentHelpRequest>>([])

  const [resolved, setIsResolved] = useState(false)

  useEffect(() => {
    (async () => {
      setRequests(await getStudentHelpRequest())
    })()
  }, [])

  return (
    <Layout>
      <Container xl>
      <Container xl css={{
          marginTop: '20px'
        }}>          
          <Card>
            <Card.Header style={{ backgroundColor: '#009CBD', maxHeight: '5px' }} />
            <Card.Body>
              <Text h3 css={{
                marginLeft: '40px'
              }}>Student Help Requests:</Text>
              <Button style={{maxWidth:'2em', textAlign:'center',marginLeft:'75%'}} onPress={()=>{
                requests.forEach(async(request, index)=> {
                  console.log(request);
                  request.isResolved = true
                  setIsResolved(true);
                  console.log(request.isResolved);
                  let response = await post('/api/student-help-form', {
                      code: 'update',
                      request: request
                    });
                  console.log(response);
                })
              }}>Resolve all requests</Button>
              <HelpRequestTable requests={requests} />
            </Card.Body>
          </Card>
        </Container>
      </Container>
    </Layout>
  );
}