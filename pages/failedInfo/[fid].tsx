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
        file_name: true

        
      }
    })
    

    return {
      props: {
        data: superjson.serialize(failedInfo)
      }, // will be passed to the page component as props
    }
  }

export default function FailedData({ data }) {
    const user = useUser()
    

    if (!user?.isLoggedIn)
    return <NotLoggedIn />

    console.log(data);

    const failedInfo = superjson.deserialize<StudentModel & {
        acquisitions: AcquisitionAttempt;
        logins: LoginAttempt;
      }>(data)
       
    console.log(failedInfo.first_name)


    return(
        <Layout>
            <Container>
                <Text>First Name: {failedInfo.first_name}</Text>
                <Text>Last Name: {failedInfo.last_name}</Text>
                <Text>Email: {failedInfo.email}</Text>
                <Text>ID: {data.id}</Text>
{/* 
                <Text>Start Time: {failedInfo.start_time}</Text>
                <Text>Finished Time: {failedInfo.acquisitions.finished_time}</Text>
                <Text>Url: {failedInfo.id}</Text>
                <Text>Http Code: {failedInfo.http_code}</Text>
                <Text>File Name: {failedInfo.file_name}</Text>
                <Text>File ext: {failedInfo.file_ext}</Text>           */}

                
            </Container>
        </Layout>
    )
}
