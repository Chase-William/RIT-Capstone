import { useEffect, useState } from 'react';
import { Course, FailedAcquisitionAttempt } from '@prisma/client';
import { post } from '../lib/fetch-wrapper';
import CoursesComponent from '../components/courses'
import StandardLayout from '../components/standard-layout'
import Layout from '../components/layout';
import Acquisitions from '../components/acqusitions';

type CourseWithAcquisitionIds = {
  id: number;
  name: string;
  failed_acquisitions: {
      id: number;
  }[];
}

async function getCourses(): Promise<CourseWithAcquisitionIds[]> {
  return await post('/api/course', {}).then(data => data.courses)
}

export default function Courses() {
  const [courses, setCourses] = useState<CourseWithAcquisitionIds[]>();
  const [acqusitionIds, setAcquisitionIds] = useState<number[]>()

  useEffect(() => {
    (async () => {
      setCourses(await getCourses())
    })()
  }, [])

  useEffect(() => {
    if (courses)
      setAcquisitionIds(courses.flatMap(course => course.failed_acquisitions.map(acq => acq.id)))
  }, [courses])

// <Acquisitions acquisitions={courses.map(value => value.failed_acquisitions.map(v => v.id))}/>

  if (!courses || !acqusitionIds)
    return <p>Loading...</p>

  return (
    <Layout>
      <StandardLayout
        topLeft={<Acquisitions acquisitionIds={acqusitionIds}/>}
        topRight={<p>Top Right</p>}
        bottom={
          <CoursesComponent courses={courses} />
        }
      />
    </Layout>
  );
}