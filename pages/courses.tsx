import axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr'
import prisma from '../lib/prisma';
import { getToken, getUserIdFromRequest } from '../lib/util';
import { NextRequest, NextResponse } from 'next/server';
import { Course } from '@prisma/client';
import { userInfo } from '../lib/useLogin';
import { post } from '../lib/fetch-wrapper';
import CoursesComponent from '../components/courses'
import StandardLayout from '../components/standard-layout'
import Layout from '../components/layout';

async function getCourses(): Promise<Course[]> {
  return await post('/api/course', {}).then(data => data.courses)
}

export default function Courses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    (async () => {
      setCourses(await getCourses())
    }
    )()
  }, [])

  return (
    <Layout>
      <StandardLayout
        topLeft={<p>Top Left</p>}
        topRight={<p>Top Right</p>}
        bottom={
          <CoursesComponent courses={courses} />
        }
      />
    </Layout>
  );
}