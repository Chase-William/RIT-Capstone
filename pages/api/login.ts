import type { User } from './user'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

/**
 * Login the user and create a session, also query the database for more information about
 * the user.
 * @param req 
 * @param res 
 */
async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body

  // console.log(`Username ${username}`)
  // console.log(`Password ${password}`)

  await prisma.course.findMany()
  try {
    const userModel = await prisma.user.findUnique({ where: { username } })
    console.log(userModel)
    const user = { 
      isLoggedIn: true, 
      username: userModel.username, 
      role: userModel.role, id: 
      userModel.id 
    } as User
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)