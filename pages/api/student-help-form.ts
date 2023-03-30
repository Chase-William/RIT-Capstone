import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const info: {
      email: string
      course: string
      description: string
    } = req.body

    const id = await prisma.course.findUnique({
      where: {
        
      }
    })

    const r = await prisma.studentHelpRequest.create({
      data: {
        email: info.email,
        course: info.selected,
        description: info.description
      }
    })
    console.log(`Request made for: ${r.email}.`)
    return res.status(200)
  }
}