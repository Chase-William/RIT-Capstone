import { useEffect, useState } from 'react';
import { Course, FailedAcquisitionAttempt } from '@prisma/client';
import { post } from '../lib/fetch-wrapper';
import CoursesComponent from '../components/courses'
import StandardLayout from '../components/standard-layout'
import Layout from '../components/layout';
import FailedAcquisitions from '../components/acqusitions';
import FailedLogins from '../components/logins';

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

export default function Courses() {
  const [courses, setCourses] = useState<CourseWithStudentAndAcquisitionIds[]>();
  const [acqusitionIds, setAcquisitionIds] = useState<number[]>()
  const [studentIds, setStudentIds] = useState<number[]>()

  useEffect(() => {
    (async () => {
      setCourses(await getCourses())
    })()
  }, [])

  useEffect(() => {
    if (courses) {
      setAcquisitionIds(courses.flatMap(course => course.failed_acquisitions.map(acq => acq.id)))
      setStudentIds(courses.flatMap(course => course.students.map(stud => stud.id)))
    }
  }, [courses])

// <Acquisitions acquisitions={courses.map(value => value.failed_acquisitions.map(v => v.id))}/>

  if (!courses || !acqusitionIds || !studentIds)
    return <p>Loading...</p>

  return (
    <Layout>
      <StandardLayout
        topLeft={<FailedAcquisitions acquisitionIds={acqusitionIds}/>}
        topRight={<FailedLogins studentIds={studentIds}/>}
        bottom={
          <CoursesComponent courses={courses} />
        }
      />
    </Layout>
  );
}