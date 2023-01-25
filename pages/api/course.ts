import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getUserIdFromRequest } from "../../lib/util"
import prisma from "../../lib/prisma"

export async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') 
  {
    const id = getUserIdFromRequest(req)

    // Get all courses where the course's professor mapping contains this professor via the id
    const courses = prisma.course.findMany({
      where: {
        professors: {
          some: {
            id: id
          }
        }
      }
    })

    return res.status(200).json({
      courses: courses
    })
  }
}