import NotLoggedIn from "../../components/error/not-logged-in";
import prisma from "../../lib/prisma";
import superjson from 'superjson';
import { useUser } from "../../lib/userUser";
import Layout from "../../components/layout";
import Router, { useRouter } from "next/router";
import StandardLayout from "../../components/standard-layout";
import Acquisitions, { AugmentedAcquisition } from "../../components/acqusitions";
import Logins, { defaultLoginHeaderAdapter, defaultLoginRowAdapter } from "../../components/logins";
import { AcquisitionAttempt , LoginAttempt , Student as StudentModel } from "@prisma/client";
import { Container, Table, Text } from "@nextui-org/react";
import { Button, Card, Row} from "@nextui-org/react";
import { useState } from "react";




export async function getServerSideProps({ params }: { params: { fid: string } }) {
    const failedInfo = await prisma.acquisitionAttempt.findUnique({
      where: {
        id: parseInt(params.fid)
      },
      select: {
        start_time: true,
        finished_time: true,
        id: true,
        status: true,
        url: true,
        http_code: true,
        file_ext: true,
        file_name: true,
        student_id: true

        
      }
    })
    const studentInfo = await prisma.student.findUnique({
      where:{
        id: failedInfo.student_id
      }
    })
    

    return {
      props: {
        data: superjson.serialize(failedInfo),
        studentData: superjson.serialize(studentInfo)
      }, // will be passed to the page component as props
    }
  }

export default function FailedData({ data, studentData }) {
    const user = useUser()
    

    if (!user?.isLoggedIn)
    return <NotLoggedIn />

    const failedInfo = superjson.deserialize<StudentModel & {
        acquisitions: AugmentedAcquisition;
      }>(data)
    const studentsData = superjson.deserialize<StudentModel>(studentData)
    console.log(studentData)
    
    

    return(
        <Layout>
            <Container>
              <Card>
              <Card.Header style={{ backgroundColor: '#009CBD', maxHeight: '5px' }}/>
                
                <Card.Body>
                  <Text h3>Failed Resource Acquisition ID: {`${failedInfo.id}`} </Text>
                  <Text h3>Student Name:</Text><Text>{`${studentsData.last_name},${studentsData.first_name}`}</Text>
                  <br></br>
                  <Text h3>Student Email:</Text><Text>{`${studentsData.email}`}</Text>
                  <br></br>
                  <Text h4>Resource Name:</Text><Text>{`${failedInfo.file_name}${failedInfo.file_ext}`}</Text>
                  <br></br>
                  <Text h4>HTTP ERROR:</Text><Text>{`${failedInfo.http_code}`}</Text>
                  <br></br>
                  <Text h4>URL:</Text><Text>{`${failedInfo.url}`}</Text>
                  <br></br>
                  <Text h4>Time:</Text><Text>{`${failedInfo.finished_time}`}</Text>
                </Card.Body>

                
              </Card>
                                
            </Container>
        </Layout>
    )
}
