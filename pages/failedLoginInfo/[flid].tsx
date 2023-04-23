import NotLoggedIn from "../../components/error/not-logged-in";
import prisma from "../../lib/prisma";
import superjson from 'superjson';
import { useUser } from "../../lib/userUser";
import Layout from "../../components/layout";
import Router, { useRouter } from "next/router";
import StandardLayout from "../../components/standard-layout";
import Acquisitions from "../../components/acqusitions";
import Logins, { defaultLoginHeaderAdapter, defaultLoginRowAdapter } from "../../components/logins";
import { AcquisitionAttempt , LoginAttempt , Student as StudentModel } from "@prisma/client";
import { Container, Table, Text } from "@nextui-org/react";
import { Button, Card, Row} from "@nextui-org/react";
import { useState } from "react";




export async function getServerSideProps({ params }: { params: { flid: string } }) {
    const failedInfo = await prisma.loginAttempt.findUnique({
      where: {
        id: parseInt(params.flid)
      },
      select: {
        id: true,
        login_timestamp: true,
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

export default function FailedLoginData({ data, studentData }) {
    const user = useUser()
    

    if (!user?.isLoggedIn)
    return <NotLoggedIn />

    console.log(data);

    const failedInfo = superjson.deserialize<StudentModel & {
        logins: LoginAttempt;
      }>(data)
    const studentsData = superjson.deserialize<StudentModel>(studentData)
    console.log(failedInfo)


    return(
        <Layout>
            <Container>
              <Card>
                <Card.Header style={{ backgroundColor: '#84BD00', maxHeight: '5px' }}/>
                  
                  <Card.Body>
                    <Text h3>Failed Login ID: {`${failedInfo.id}`} </Text>
                    <Text h3>Student Name:</Text><Text>{`${studentsData.last_name},${studentsData.first_name}`}</Text>
                    <br></br>
                    <Text h3>Student Email:</Text><Text>{`${studentsData.email}`}</Text>
                    <br></br>
                    <Text h4>Login Timestamp:</Text><Text>{`${failedInfo.login_timestamp}`}</Text>
                    
                  </Card.Body>

                  
                </Card>

                
            </Container>
        </Layout>
    )
}
