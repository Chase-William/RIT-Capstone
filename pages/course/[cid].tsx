import { useEffect } from "react";
import Acquisitions from "../../components/acqusitions";
import Layout from "../../components/layout";
import StandardLayout from "../../components/standard-layout";
import { get } from "../../lib/fetch-wrapper";
import { useRouter } from "next/router";

// TODO: Change any return 
// async function getCourse(id: number): Promise<any[]> {
//   return await get('/api/course', {
//     id: id
//   })
//     .then(res => res.course)
// }

export default function Course({ props }) {

  // TODO: Can we use SSR? id of course is in url, is apikey in headers? 


  // useEffect(() => {
  //   (() => {
  //     get
  //   })
  // }, [])

  return (
    <Layout>
    <StandardLayout
      topLeft={<Acquisitions title={'Failed Resource Acquisitions'} acquisitions={acquisition} />}
      topRight={<p>Export Component</p>}
      bottom={
        <p>Students Component</p>
      }
    />
  </Layout>
  )
}