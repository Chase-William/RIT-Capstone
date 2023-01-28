import { useEffect, useState } from 'react';
import { Course, AcquisitionAttempt } from '@prisma/client';
import { post } from '../lib/fetch-wrapper';
import CoursesComponent from '../components/courses'
import StandardLayout from '../components/standard-layout'
import Layout from '../components/layout';
import Acquisitions from '../components/acqusitions';
import Logins, { LoginWithStudentEmail } from '../components/logins';
import { AugmentedAcquisition } from '../components/acqusitions';

type AugmentedCourse = {
  id: number;
  name: string;
  acquisitions: AugmentedAcquisition[];
  students: {
    id: number;
  }[];
}

async function getCourses(): Promise<AugmentedCourse[]> {
  return await post('/api/course', {}).then(data => data.courses)
}

async function getLogins(ids: number[]): Promise<LoginWithStudentEmail[]> {
  return await post('/api/login', {
    ids: ids
  })
    .then(res => res.logins)
}

export default function Courses() {
  const [courses, setCourses] = useState<AugmentedCourse[]>();
  const [logins, setLogins] = useState<LoginWithStudentEmail[]>()
  const [acquisition, setAcquisitions] = useState<AugmentedAcquisition[]>()

  useEffect(() => {
    (async () => {
      setCourses(await getCourses())
    })()
  }, [])

  useEffect(() => {
    if (courses) {
      setAcquisitions(courses.flatMap(course => course.acquisitions.map(acq => acq)))
      const ids = courses.flatMap(course => course.students.map(stud => stud.id));
      
      (async () => {
        setLogins(await getLogins(ids))
      })()
    }
  }, [courses])

  if (!courses || !acquisition)
    return <p>Loading...</p>

  return (
    <Layout>
      <StandardLayout
        topLeft={<Acquisitions title={'Failed Resource Acquisitions'} acquisitions={acquisition} />}
        topRight={<Logins title={'Failed Logins'} logins={logins} />}
        bottom={
          <CoursesComponent courses={courses} />
        }
      />
    </Layout>
  );
}