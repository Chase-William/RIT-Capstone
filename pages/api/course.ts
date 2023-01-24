import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { ADMIN_ROLE, PROF_ROLE } from "./user";
import { parseCookie } from "../../lib/util";

/* https://github.com/vvo/iron-session#nextjs-withironsessionapiroutehandler-ironoptions--req-nextapirequest-res-nextapiresponse--ironoptions--promiseironoptions */

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const cookie = parseCookie(req.headers.cookie);

  console.log('Cookie: ' + cookie.auth)

  if (!cookie)
    return res.status(400).end("Cookie was falsy")

  const test = await prisma.auth.findFirst()
  console.log('Saved: ' + test.token)

  const auth = await prisma.auth.findUnique({
    where: {
      token: cookie.auth
    }
  })

  const user = auth

  if (!user)
    return res.status(400).end("A user does not exist for the provided token.")

  // if (user.role === PROF_ROLE) { // Return courses this professor is listed in
  //   const courses = await prisma.course.findMany({
  //     where: {
  //       professors: {
  //         some: {
  //           id: user.id
  //         }
  //       }
  //     }
  //   })
  //   return res.status(200).json(courses)
  // } else if (user.role === ADMIN_ROLE) { // Return all courses for admin
  //   const courses = await prisma.course.findMany()
  //   return res.status(200).json(courses)
  // }

  // return res.status(400).json({
  //   message: `Invalid role of ${user.role} was provided.`
  // })
}


