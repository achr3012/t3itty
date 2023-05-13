import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function getUser(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  return user;
}

export default async function Home() {
  const user = await getUser(1);
  return (
    <h1 className="text-xl text-purple-800">Hello T3itty, {user && user.name}</h1>
  )
}
