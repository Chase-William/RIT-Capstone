/**
 * Seeding Prisma with default data: https://www.prisma.io/docs/guides/database/seed-database
 */

import { PrismaClient } from "@prisma/client"
import { PROF_ROLE } from "../pages/api/user"
const bcrypt = require('bcrypt');
const prisma = new PrismaClient()

function hashPass(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

async function main() {
  // const test = await prisma.user.create(
  //   {
  //     data: {
  //       username: "Ben O. Verbich",
  //       password: "Please",
  //       role: "prof",
  //       email: "bigben@hotmail.com"
  //     }
  //   }
  // )

  const users = await prisma.user.createMany(
    {
      data: [
        {
          username: "Ben O. Verbich",
          password: hashPass('123'),
          role: PROF_ROLE,
          email: "bigben@hotmail.com"
        },
        {
          username: "Adolf Oliver Nipple",
          password: hashPass('123'),
          role: PROF_ROLE,
          email: "olfnip@gmail.com"
        },
        {
          username: "Phil Mahoochie",
          password: hashPass('123'),
          role: "admin",
          email: "philmaplease@bullhornmail.com"
        },
        {
          username: "Long Henry",
          password: hashPass('123'),
          role: PROF_ROLE,
          email: "longerthanu@hotmail.com"
        },
        {
          username: "Craven Moorehead",
          password: hashPass('123'),
          role: PROF_ROLE,
          email: "moorehead@hotmail.com"
        },
        {
          username: "Dang Lin-Wang",
          password: hashPass('123'),
          role: PROF_ROLE,
          email: "airtime@hotmail.com"
        },
        {
          username: "E. Norma Scock",
          password: hashPass('123'),
          role: PROF_ROLE,
          email: "scock@hotmail.com"
        },
        {
          username: "Ben N. Syder",
          password: hashPass('123'),
          role: PROF_ROLE,
          email: "nsyder@hotmail.com"
        }
      ]
    }
  )

  const courses = await prisma.course.createMany({
    data: [
      {
        name: 'Personality Psychology'
      },
      {
        name: 'Abnormal Psychology'
      },
      {
        name: 'Developmental Psychology'
      },
      {
        name: 'Psychology 101'
      },
      {
        name: 'Senior Capstone Project 1'
      },
      {
        name: 'Senior Capstone Project 2'
      }
    ]
  })

  const longHenry = await prisma.user.update({
    where: {
      username: 'Long Henry'
    },
    data: {
      courses: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    }
  })

  // const introToDatabaseCourse = prisma.course.findFirst({
  //   where: {
  //     name: {
  //       equals: 'Introduction to Database Modeling'
  //     }
  //   }
  // })

  // const longHenry = prisma.user.findFirst({
  //   where: {
  //     username: {
  //       equals: 'Long Henry'
  //     }
  //   }
  // })

  console.log(users)
  console.log(longHenry)
  console.log(courses)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })