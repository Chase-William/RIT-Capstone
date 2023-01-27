import { useEffect, useState } from 'react';
import { Course, FailedAcquisitionAttempt } from '@prisma/client';
import { post } from '../lib/fetch-wrapper';
import CoursesComponent from '../components/courses'
import StandardLayout from '../components/standard-layout'
import Layout from '../components/layout';
import FailedAcquisitions from '../components/acqusitions';
import FailedLogins, { LoginWithStudentEmail } from '../components/logins';

type CourseWithStudentAndAcquisitionIds = {
  id: number;
  name: string;
  failed_acquisitions: {
    id: number;
  }[];
  students: {
    id: number;
  }[];
}

async function getCourses(): Promise<CourseWithStudentAndAcquisitionIds[]> {
  return await post('/api/course', {}).then(data => data.courses)
}

async function getLogins(ids: number[]): Promise<LoginWithStudentEmail[]> {
  return await post('/api/failed-login', {
    ids: ids
  })
    .then(res => res.logins)
}

export default function Courses() {
  const [courses, setCourses] = useState<CourseWithStudentAndAcquisitionIds[]>();
  const [acqusitionIds, setAcquisitionIds] = useState<number[]>()
  // const [studentIds, setStudentIds] = useState<number[]>()
  const [logins, setLogins] = useState<LoginWithStudentEmail[]>()

  useEffect(() => {
    (async () => {
      setCourses(await getCourses())
    })()
  }, [])

  useEffect(() => {
    if (courses) {
      setAcquisitionIds(courses.flatMap(course => course.failed_acquisitions.map(acq => acq.id)))
      const ids = courses.flatMap(course => course.students.map(stud => stud.id))
      // setStudentIds(courses.flatMap(course => course.students.map(stud => stud.id)))
      {}
      (async () => {
        setLogins(await getLogins(ids))
      })()  
    }    
  }, [courses])

  if (!courses || !acqusitionIds)
    return <p>Loading...</p>

  return (
    <Layout>
      <StandardLayout
        topLeft={<FailedAcquisitions acquisitionIds={acqusitionIds}/>}
        topRight={<FailedLogins logins={logins}/>}
        bottom={
          <CoursesComponent courses={courses} />
        }
      />
    </Layout>
  );
}