import { AcquisitionAttempt, LoginAttempt, StudentHelpRequest } from "@prisma/client";
import { useEffect, useState } from "react";
import Login from "../components/auth/login";
import NotLoggedIn from "../components/error/not-logged-in";
import Layout from "../components/layout";
import { get, post } from "../lib/fetch-wrapper";
import { useUser } from "../lib/userUser";
import HelpRequestTable from '../components/help-request-table';
import prisma from "../lib/prisma"


import CoursesComponent from '../components/courses'
import StandardLayout from '../components/standard-layout'

import Acquisitions from '../components/acqusitions';
import Logins, { LoginWithStudentEmail } from '../components/logins';
import { AugmentedAcquisition } from '../components/acqusitions';
import { useRouter } from 'next/router';

import { Card, Container, Spacer, Table, Text } from '@nextui-org/react';

import Chart from 'react-google-charts';
import RAWRSpacer from '../components/spacer';




type AugmentedCourse = {
  id: number;
  name: string;
  acquisitions: AugmentedAcquisition[];
  students: {
    id: number;
  }[];
}

async function getStudentHelpRequest(): Promise<Array<StudentHelpRequest>> {
  return await get('/api/student-help-form', {})
    .then(data => data.requests)
}

async function getCourses(): Promise<AugmentedCourse[]> {
  return await post('/api/course', {}).then(data => data.allCourses)
}

async function getLogins(ids: number[]): Promise<LoginWithStudentEmail[]> {
  return await post('/api/login', {
    ids: ids
  })
    .then(res => res.logins)
}

export default function Stats() {
  const user = useUser()
  const [courses, setCourses] = useState<AugmentedCourse[]>();
  const [successAcqs, setSuccessAcqs] = useState<AugmentedAcquisition[]>()
  const [failedAcqs, setFailedAcqs] = useState<AugmentedAcquisition[]>()
  const [aquisAggre, setAquisAggre] = useState<(string | number)[][]>()

  const [successLogins, setSuccessLogins] = useState<LoginWithStudentEmail[]>()
  const [failedLogins, setFailedLogins] = useState<LoginWithStudentEmail[]>()
  const [loginAggre, setLoginAggre] = useState<(string | number)[][]>()

  const [requests, setRequests] = useState<Array<StudentHelpRequest>>([])

  useEffect(() => {
    if(user?.isLoggedIn){
      (async () => {
        setRequests(await getStudentHelpRequest())
      })()
    }
    
  }, [user])

  useEffect(() => {
    // Only fetch course information if user has a cookie (logged in)
    if (user?.isLoggedIn) {
      (async () => {
        setCourses(await getCourses())
      })()
    }
  }, [user])

  useEffect(() => {
    if(courses){
      // Process Acquisitions
      const tempAcqs = courses.flatMap(course => course.acquisitions.map(acq => acq))
      const ids = courses.flatMap(course => course.students.map(stud => stud.id));
      const failed = tempAcqs.filter(v => !v.status)
      const success = tempAcqs.filter(v => v.status)

      // Set States
      setAquisAggre([
        ["Type", "Quantity"],
        ["Successful", success.length],
        ["Failed", failed.length]// Subtract failed from total to get success count
      ]);
      setFailedAcqs(failed)
      setSuccessAcqs(success)

        ; (async () => {
          const logins = await getLogins(ids)
          console.log(logins)

          const failed = logins.filter(v => !v.status)
          const success = logins.filter(v => v.status)

          // Set States
          setLoginAggre([
            ["Type", "Quantity"],
            ["Successful", success.length], // Subtract failed from total to get success count
            ["Failed", failed.length]
          ]);
          setFailedLogins(failed)
          setSuccessLogins(success)
        })()
    }
}, [courses])

  if (!user?.isLoggedIn)
    return NotLoggedIn()

  if (!courses || !successAcqs || !failedAcqs || !successLogins || !failedLogins || !requests)
    return <p>Loading...</p>

  console.log(requests)

  return (
    <Layout>
      <Container xl>
      <StandardLayout
          topLeft={
            <>
              <h4>Acqusition Info</h4>
              <Chart
                chartType="PieChart"
                data={aquisAggre}
                options={{ title: 'Acquisition Distribution' }}
                width={"100%"}
                height={"230px"}
              />

              <Text>Total Failed Acquisitions: {failedAcqs.length}</Text>
              <Text>Total Successful Acquisitions: {successAcqs.length}</Text>

              <RAWRSpacer />

              <Acquisitions
                title='Failed Resource Acquisitions' acquisitions={failedAcqs}
                headerAdapter={() => {

                  return (
                    <Table.Header>
                      <Table.Column>Id</Table.Column>
                      <Table.Column>Student</Table.Column>
                      <Table.Column>Course</Table.Column>
                      <Table.Column>Timestamp</Table.Column>
                      <Table.Column>Url</Table.Column>
                    </Table.Header>
                  )
                }}
                rowAdapter={(v: AugmentedAcquisition) => {

                  return (
                    <Table.Row key={v.id}>
                      <Table.Cell>{v.id}</Table.Cell>
                      <Table.Cell><a target='_blank' href={"https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" + v.student.email + "&su=Trouble Accessing Resources"}>{v.student.email}</a></Table.Cell>
                      <Table.Cell>{v.course.name}</Table.Cell>
                      <Table.Cell>{v.start_time.replace(/T/, ' ').replace(/\..+/, '')}</Table.Cell>
                      <Table.Cell>{v.url}</Table.Cell>
                    </Table.Row>
                  )
                }}
              />
            </>
          }
          topRight={
            <>
              <h4>Login Info</h4>
              <Chart
                chartType="PieChart"
                data={loginAggre}
                options={{ title: 'Login Distribution' }}
                width={"100%"}
                height={"230px"}
              />

              <Text>Total Failed Logins: {failedLogins.length}</Text>
              <Text>Total Successful Logins: {successLogins.length}</Text>

              <RAWRSpacer />

              <Logins
                handleSelection={null}
                title={'Failed Logins'}
                logins={failedLogins}
                headerAdapter={() => {
                  return (
                    <Table.Header>
                      <Table.Column>Id</Table.Column>
                      <Table.Column>Student</Table.Column>
                      <Table.Column>Timestamp</Table.Column>
                    </Table.Header>
                  )
                }}
                rowAdapter={(v: LoginWithStudentEmail) => {
                  return (
                    <Table.Row key={v.id}>
                      <Table.Cell>{v.id}</Table.Cell>
                      <Table.Cell><a target='_blank' href={"https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" + v.student.email + "&su=Trouble Accessing Resources"}>{v.student.email}</a></Table.Cell>
                      <Table.Cell>{v.login_timestamp.replace(/T/, ' ').replace(/\..+/, '')}</Table.Cell>
                    </Table.Row>
                  )
                }} />
            </>
          }
          bottom={
            <CoursesComponent courses={courses} />
          }
        />
        {/* <Container xl css={{
          marginTop: '20px'
        }}>          
          <Card>
            <Card.Header style={{ backgroundColor: '#009CBD', maxHeight: '5px' }} />
            <Card.Body>
              <Text h3 css={{
                marginLeft: '40px'
              }}>Student Help Requests:</Text>
              <HelpRequestTable requests={requests} />
            </Card.Body>
          </Card>
        </Container> */}
      </Container>
      
    </Layout>
  )
}