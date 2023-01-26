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

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

async function newFailedLogin(studentId: number) {
  await prisma.failedLoginAttempt.create({
    data: {
      login_timestamp: new Date(Date.now() - getRandomInt(50000)),
      student: {
        connect: { id: studentId }
      } 
    }
  })
}

async function newFailedAcquisition(studentId: number, courseId: number) {
  await prisma.failedAcquisitionAttempt.create({
    data: {
      url: 'https://....',
      start_time: new Date(Date.now() - getRandomInt(50000)),
      finished_time: new Date(),
      course: {
        connect: {
          id: courseId
        }
      },
      file_name: 'brah',
      file_ext: '.jpg',
      http_code: '500',
      student: {
        connect: {
          id: studentId
        }
      }
    }
  })
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

  await prisma.student.create({
    data: {      
      first_name: 'Jimmy',
      last_name: 'Hoffa',
      email: 'jxm4975@rit.edu',
      courses: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    }
  })

  await prisma.student.create({
    data: {      
      first_name: 'John',
      last_name: 'William',
      email: 'jxw4623@rit.edu',
      courses: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    }
  })

  await prisma.student.create({
    data: {      
      first_name: 'Piper',
      last_name: 'Perri',
      email: 'pxp7690@rit.edu',
      courses: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    }
  })

  // New failure where student 1 tried to get resources from course 1, on three seperate occasions
  await newFailedAcquisition(1, 1)
  await newFailedAcquisition(1, 1)
  await newFailedAcquisition(1, 1)
  // course 2
  await newFailedAcquisition(1, 2)
  await newFailedAcquisition(1, 2)
  // course 3
  await newFailedAcquisition(1, 3)

  // Student 2, same idea
  await newFailedAcquisition(2, 1)
  await newFailedAcquisition(2, 1)
  await newFailedAcquisition(2, 1)
  // course 2
  await newFailedAcquisition(2, 2)
  await newFailedAcquisition(2, 2)
  // course 3
  await newFailedAcquisition(2, 3)

  // Create new fail login attempts connected to a student with a randomized time of failure
  await newFailedLogin(1);
  await newFailedLogin(1);
  await newFailedLogin(1);

  await newFailedLogin(2);
  await newFailedLogin(2);
  await newFailedLogin(2);

  await newFailedLogin(3);
  await newFailedLogin(3);

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