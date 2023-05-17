import { prisma } from "./prisma";

export default async function fetchTweets() {
  return await prisma.tweet.findMany({
    select: {
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      },
      id: true,
      content: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}