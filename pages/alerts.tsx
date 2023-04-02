import { useEffect, useState } from 'react';
import { post } from '../lib/fetch-wrapper';
import CoursesComponent from '../components/courses'
import StandardLayout from '../components/standard-layout'
import CourseLayout from '../components/courseLayout'
import Layout from '../components/layout';
import Acquisitions from '../components/acqusitions';
import Logins, { LoginWithStudentEmail } from '../components/logins';
import { AugmentedAcquisition } from '../components/acqusitions';
import { useRouter } from 'next/router';
import { useUser } from '../lib/userUser';
import { Card, Container, Spacer, Table, Text } from '@nextui-org/react';
import NotLoggedIn from '../components/error/not-logged-in';
import Chart from 'react-google-charts';
import RAWRSpacer from '../components/spacer';



export default function Alerts() {
  
  return (
    <Layout>
      <Container xl>
      <CourseLayout 
        top={
          <>
            <h1>
                New Alerts
            </h1>
          </>
        }
        bottom={
         <>
         <h1>
                Old Alerts
            </h1>
         </>
        }
      />
      </Container>
    </Layout>
  );
}