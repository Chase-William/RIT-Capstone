import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"
import { StudentHelpRequest } from "@prisma/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const r = await prisma.studentHelpRequest.findMany({
      where: {
        isResolved: false
      }
    })    
    return res.status(200).json({
      requests: r
    })
  }
  else if (req.method === 'POST') {
    if (req.body?.code === 'update') {
      // console.log('asdasd')
      const request = req.body.request as StudentHelpRequest
      // console.log(request)
      if (!request)
        return res.status(400).end()
      await prisma.studentHelpRequest.update({
        where: {
          id: request.id
        },
        data: {
          isResolved: request.isResolved
        }
      })
      return res.status(200).end()
    }
    const info: {
      email: string
      course: string
      description: string
    } = req.body

    const course = await prisma.course.findUnique({
      where: {
        name: info.course
      },
      select: {
        id: true
      }
    })

    const r = await prisma.studentHelpRequest.create({
      data: {
        email: info.email,
        course_id: course.id,
        description: info.description
      }
    })
    console.log(`Request made for: ${r.email}.`)
    return res.status(200).end()
  }
}