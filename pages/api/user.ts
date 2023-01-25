// import { withIronSessionApiRoute } from 'iron-session/next'
// import { sessionOptions } from '../../lib/session'
// import { NextApiRequest, NextApiResponse } from 'next'

import { NextApiRequest, NextApiResponse } from "next"

// /*
//   Used as the generic user object omitting fields like password.
// */
// export type User = {
//   isLoggedIn: boolean
//   username: string
//   role: string
//   id: number
// }

export const PROF_ROLE = 'professor'
export const ADMIN_ROLE = 'admin'

export type User = {
  username: string
  role: string  
  isLoggedIn: boolean
}

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {

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