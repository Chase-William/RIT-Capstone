import NotLoggedIn from "../../components/error/not-logged-in";
import prisma from "../../lib/prisma";
import superjson from 'superjson';
import { useUser } from "../../lib/userUser";
import Layout from "../../components/layout";
import CourseLayout from '../../components/courseLayout'
import StandardLayout from "../../components/standard-layout";
import Acquisitions from "../../components/acqusitions";
import Logins, { defaultLoginHeaderAdapter, defaultLoginRowAdapter } from "../../components/logins";
import { AcquisitionAttempt, LoginAttempt, Student as StudentModel } from "@prisma/client";
import { Container, Table, Text } from "@nextui-org/react";
import { Button, Card, Row} from "@nextui-org/react";
import { CSVLink, CSVDownload } from "react-csv";

export default function StudentHelpDescrption({}){

    return(
        <Layout>
        <Container xl>
        <CourseLayout 
          top={
            <>
              <h1>
                  Submitted By: 
              </h1>
            </>
          }
          bottom={
           <>
           <h1>
                 Help description: 
              </h1>
           </>
          }
        />
        </Container>
      </Layout>
    );
}