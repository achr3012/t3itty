import { prisma } from "./prisma";

export async function fetchUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  return user
}