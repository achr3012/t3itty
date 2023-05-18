import { Tweet } from "@prisma/client";
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
      userId: true,
      content: true,
      createdAt: true,
      _count: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function likeExists(data: { userId: string; tweetId: string; }) {
  const like = await prisma.like.findUnique({ where: { userId_tweetId: data }, select: { tweetId: true } })
  if (like) {
    return true
  } else {
    return false
  }
}