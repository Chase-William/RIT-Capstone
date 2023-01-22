import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { ADMIN_ROLE, PROF_ROLE } from "./user";
import { getIronSession } from "iron-session/edge";
import { withIronSessionApiRoute } from "iron-session/next/dist";

/* https://github.com/vvo/iron-session#nextjs-withironsessionapiroutehandler-ironoptions--req-nextapirequest-res-nextapiresponse--ironoptions--promiseironoptions */

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  if (!req.session)
    return res.status(405).end()

  const { role, id } = req.session.user

  if (role === PROF_ROLE) { // Return courses this professor is listed in
    const courses = await prisma.course.findMany({
      where: {
        professors: {
          some: {
            id: {
              equals: id
            }
          }
        }
      }
    })
    return res.status(200).json(courses)
  } else if (role === ADMIN_ROLE) { // Return all courses for admin
    const courses = await prisma.course.findMany()
    return res.status(200).json(courses)
  }

  return res.status(400).json({
    message: `Invalid role of ${role} was provided.`
  })
}

