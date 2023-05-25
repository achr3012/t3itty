import { prisma } from "./prisma";

export async function fetchUser(id: string) {
  return await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      tweets: true,
      likes: true,
      followers: true,
      follows: true,
      _count: { select: { followers: true, follows: true, likes: true, tweets: true } }
    },
    where: { id },
  })
}