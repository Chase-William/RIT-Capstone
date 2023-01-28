import prisma from "../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export type User = {
  username: string
  role: string
  isLoggedIn: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true
      }
    })

    return res.status(200).json({
      users: users
    })
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