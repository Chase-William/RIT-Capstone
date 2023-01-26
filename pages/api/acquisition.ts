import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const ids: number[] = req.body.ids
    // Get all courses where the course's professor mapping contains this professor via the id
    const acquisitions = await prisma.failedAcquisitionAttempt.findMany({
      where: {
        id: {
          in: ids
        }
      },
      select: {
        id: true,
        course: {
          select: {
            name: true
          }
        },
        student: {
          select: {
            email: true
          }
        }
      }
    })

    return res.status(200).json({
      acquisitions: acquisitions
    })
  }
}