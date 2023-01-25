import axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr'
import prisma from '../lib/prisma';
import { getToken, getUserIdFromRequest } from '../lib/util';
import { NextRequest, NextResponse } from 'next/server';
import { Course } from '@prisma/client';
import { userInfo } from '../lib/useLogin';
import { post } from '../lib/fetch-wrapper';

// Display list of posts (in /pages/index.tsx)

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

// export async function getServerSideProps({ req, res }: { req: NextRequest, res: NextResponse }) {
//   // console.log('res: ')
//   // console.log(req.headers)

//   const id = getUserIdFromRequest(req)



//   // Get all courses where the course's professor mapping contains this professor via the id
//   const courses = prisma.course.findMany({
//     where: {
//       professors: {
//         some: {
//           id: id
//         }
//       }
//     }
//   })

//   return {
//     props: {
//       courses: courses
//     }
//   }
// }

async function getCourses(): Promise<Course[]> {
  return await post('/api/course', {}).then(data => data.courses)
}

export default function Courses() {
  const [courses, setCourses] = useState([])
  // const [isLoading, setLoading] = useState(false)
  // const { data: courses, error } = useSWR('/api/course', fetcher)

  useEffect(() => {
    //console.log('get info for courses')
    //console.log('token: ' + getToken())

    (async () => { 
      setCourses(await getCourses()) }
    )()
  }, [])

  // if (isLoading) return <p>Loading</p>
  // if (!courses) return <p>No course data available.</p>

  console.log(courses)

  return (
    <ul>
      <p>Hello</p>
      {courses.map(course => (
        <li key={course.id}>{course.name}</li>
      ))}
    </ul>
  );
}