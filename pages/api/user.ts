import prisma from "../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { UserWithoutPassword } from "../user/[uid]"

export type User = {
  username: string
  role: string
  isLoggedIn: boolean,
  apiKey: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany({
      select: {        
        username: true,
        email: true,
        role: true,
        id: true,
      }
    })

    return res.status(200).json({
      users: users
    })
  }
  else if (req.method === 'POST') {
    const account: { 
      username: string
      email: string
      role: string
      id: number
    } = req.body.account
    console.log(account)
    const r = await prisma.user.update({
      where: {
        id: account.id
      },
      data: {
        email: account.email,
        username: account.username,
        role: account.role
      }
    })
    console.log(`Information updated for user: ${r.username}, Role: ${r.role}, Email: ${r.email}}`)
    return res.status(200)
  }
}

// async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
//   if (req.session.user) {
//     // in a real world application you might read the user id from the session and then do a database request
//     // to get more information on the user if needed
//     res.json({ // Successful Login
//       ...req.session.user,
//       isLoggedIn: true,
//     })
//   } else { // Failed Login
//     res.json({
//       isLoggedIn: false,
//       username: '',
//       role: '',
//       id: -1
//     })
//   }
// }

// export default withIronSessionApiRoute(userRoute, sessionOptions)