import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import jwt from 'jsonwebtoken'
import { User } from "./user";
const bcrypt = require('bcrypt');

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, email, role } = await req.body

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const userModel = await prisma.user.create({
      data: {
        username: username,
        password: hash,
        email: email,
        role: role
      }
    })

    console.log(userModel)

    // TODO: This the logic below is identical to the api/login jwt creation and response section

    const token = jwt.sign({
      id: userModel.id
    }, // Provide private key
      process.env.JWT_PRIVATE_KEY
    )

    return res.json({
      user: {
       username: userModel.username,
       role: userModel.role 
      } as User,
      apiKey: token
    })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: (error as Error).message })
  }
}