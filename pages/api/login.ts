import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let success = false
    let logins
    console.log(req.query.success)
    if (req.query.success) { // if defined in url params
      if (req.query.success === 'true') // set if true
        success = true
        // query using `success` variable
        logins = await prisma.loginAttempt.findMany({
          where: {
            status: success
          },
          select: {
            id: true,
            login_timestamp: true,
            status: true,
            student: {
              select: {
                email: true
              }
            }
          }
        })
    } else {
      // No success query provided, get all
      logins = await prisma.loginAttempt.findMany({
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
    }

    console.log('Logins: ' + logins)

    return res.status(200).json({
      logins: logins
    })
  }
  else if (req.method === 'POST') {
    // console.log('POST Logins')
    const ids: number[] = req.body.ids
    console.log(ids)
    const logins = await prisma.loginAttempt.findMany({
      where: {
        student_id: {
          in: ids
        }
      },
      select: {
        id: true,
        status: true,
        login_timestamp: true,
        student: {
          select: {
            email: true
          }
        }
      }
    })
    // console.log(logins)
    return res.status(200).json({
      logins: logins
    })
  }
}