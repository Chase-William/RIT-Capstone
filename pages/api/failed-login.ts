import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const logins = await prisma.failedLoginAttempt.findMany({
      select: {
        id: true,
        login_timestamp: true,
        student: {
          select: {
            email: true
          }
        }
      }
    })

    console.log(logins)

    return res.status(200).json({
      logins: logins
    })
  }
  else if (req.method === 'POST') {
    const ids: number[] = req.body.ids

    const logins = await prisma.failedLoginAttempt.findMany({
      where: {
        id: {
          in: ids
        }
      },
      select: {
        id: true,
        login_timestamp: true,
        student: {
          select: {
            email: true
          }
        }
      }
    })

    return res.status(200).json({
      logins: logins
    })
  }
}