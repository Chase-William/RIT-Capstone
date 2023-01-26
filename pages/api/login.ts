// import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { User } from './user'
import { sign } from '../../lib/jwt';
const bcrypt = require('bcrypt');

/**
 * Login the user and create a session, also query the database for more information about
 * the user.
 * @param req 
 * @param res 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST')
    return res.status(400).end('Can only authenticate via a Post request.');  

  const { username, password } = await req.body

  // console.log(`Username ${username}`)
  // console.log(`Password ${password}`)

  try {
    const userModel = await prisma.user.findUnique({ where: { username } })

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (!bcrypt.compare(hash, userModel.password))
      return res.status(400).end()

    const apiKey = await sign({ id: userModel.id }, process.env.JWT_PRIVATE_KEY)
    
    // const token = jwt.sign({
    //   id: userModel.id
    // }, // Provide private key
    //   process.env.JWT_PRIVATE_KEY
    // )

    return res.json({
      user: {
       username: userModel.username,
       role: userModel.role,
       isLoggedIn: true
      } as User,
      apiKey: apiKey
    })

    // const user = { 
    //   isLoggedIn: true, 
    //   username: userModel.username, 
    //   role: userModel.role, id: 
    //   userModel.id 
    // } as User
    // req.session.user = user 
    // await req.session.save()

    // const authCookie = req.cookies.auth
    // console.log(req.cookies)
    // console.log(authCookie)
    // Create an auth record for this cookie if it does not already exist
    // const s = await prisma.auth.create({      
    //   data: {
    //     token: authCookie,
    //     user: {
    //       connect: {
    //         id: userModel.id
    //       }
    //     }
    //   }
    // })

    // res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: (error as Error).message })
  }
}

// export default withIronSessionApiRoute(loginRoute, sessionOptions)