/**
 * Seeding Prisma with default data: https://www.prisma.io/docs/guides/database/seed-database
 */

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

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
          password: "Please",
          role: "prof",
          email: "bigben@hotmail.com"
        },
        {
          username: "Adolf Oliver Nipple",
          password: "Both",
          role: "prof",
          email: "olfnip@gmail.com"
        },
        {
          username: "Phil Mahoochie",
          password: "Please",
          role: "admin",
          email: "philmaplease@bullhornmail.com"
        },
        {
          username: "Long Henry",
          password: "4.53 Inches",
          role: "prof",
          email: "longerthanu@hotmail.com"
        },
        {
          username: "Craven Moorehead",
          password: "ravenhead",
          role: "prof",
          email: "moorehead@hotmail.com"
        },
        {
          username: "Dang Lin-Wang",
          password: "airtimer",
          role: "prof",
          email: "airtime@hotmail.com"
        },
        {
          username: "E. Norma Scock",
          password: "kcocs",
          role: "prof",
          email: "scock@hotmail.com"
        },
        {
          username: "Ben N. Syder",
          password: "justhetip",
          role: "prof",
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