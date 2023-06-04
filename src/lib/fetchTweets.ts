
import { fetchUser } from "./fetchUser";
import { prisma } from "./prisma";

const select = {
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
  _count: { select: { likes: true } }
}


export async function fetchTweets() {
  return await prisma.tweet.findMany({
    select,
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function fetchUserTweets(id: string) {
  return await prisma.tweet.findMany({
    where: {
      userId: id
    },
    select,
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function fetchUserLikedTweets(id: string) {
  return await prisma.like.findMany({
    where: {
      userId: id
    },
    select: { Tweet: { select } },
    orderBy: {
      tweetId: "desc"
    }
  })
}

export async function fetchFollowingsTweets(id: string) {
  const user = await fetchUser(id)
  return await prisma.tweet.findMany({
    where: {
      user: {
        followers: { some: { id: user?.id } }
      }
    },
    select,
    orderBy: {
      createdAt: 'desc'
    }
  });
}