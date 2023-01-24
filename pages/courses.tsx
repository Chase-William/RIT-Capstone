import { useEffect, useState } from 'react';
import useSWR from 'swr'

// Display list of posts (in /pages/index.tsx)

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Courses() {
  // const [courses, setCourses] = useState(null)
  const [isLoading, setLoading] = useState(false)
  // const { data: courses, error } = useSWR('/api/course', fetcher)

  useEffect(() => {
    setLoading(true)

    // fetch('/api/course')
    //   .then(res => res.json())
    //   .then(data => {
    //     setCourses(data)
    //     setLoading(false)
    //   })
  }, [])

  if (isLoading) return <p>Loading</p>
  // if (!courses) return <p>No course data available.</p>

  return (
    <ul>
      {/* {courses.map(course => (
        <li key={course.id}>{course.name}</li>
      ))} */}
    </ul>
  );
}