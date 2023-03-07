import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getUserIdFromRequest } from "../../lib/util"
import prisma from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') 
  {
    const id = getUserIdFromRequest(req)
   
    // Get all courses where the course's professor mapping contains this professor via the id
    const courses = await prisma.course.findMany({
      where: {
        professors: {
          some: {
            id: id
          }
        }
      },
      select: {
        id: true,
        name: true,
        acquisitions: {
          select: {
            id: true,
            status: true,
            student: {
              select: {
                id: true,
                email: true
              }
            },
            course: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        students: {
          select: {
            id: true
          }
        }
      }
    })

    return res.status(200).json({
      courses: courses
    })
  }
}