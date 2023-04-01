import NotLoggedIn from "../../components/error/not-logged-in";
import prisma from "../../lib/prisma";
import superjson from 'superjson';
import { useUser } from "../../lib/userUser";
import Layout from "../../components/layout";
import Router, { useRouter } from "next/router";
import StandardLayout from "../../components/standard-layout";
import Acquisitions from "../../components/acqusitions";
import Logins, { defaultLoginHeaderAdapter, defaultLoginRowAdapter } from "../../components/logins";
import { AcquisitionAttempt, LoginAttempt, Student as StudentModel } from "@prisma/client";
import { Container, Table, Text } from "@nextui-org/react";
import { Button, Card, Row} from "@nextui-org/react";



export async function getServerSideProps({ params }: { params: { fid: string } }) {
    const failedInfo = await prisma.student.findUnique({
      where: {
        id: parseInt(params.fid)
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
        data: superjson.serialize({failedInfo})
      }, // will be passed to the page component as props
    }
  }

export default function FailedData({ data }) {
    const user = useUser()

    if (!user?.isLoggedIn)
    return <NotLoggedIn />

    const student = superjson.deserialize<StudentModel & {
        acquisitions: AcquisitionAttempt[];
        logins: LoginAttempt[];
      }>(data)

    return(
        <Layout>
            <Container>
                <Text>Username: {student.last_name+','+student.first_name}</Text>
            </Container>
        </Layout>
    )
}
