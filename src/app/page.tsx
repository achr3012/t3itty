import { AuthOptions } from "@/lib/AuthOptions"
import { getServerSession } from "next-auth"



export default async function Home() {
  const session = await getServerSession(AuthOptions);
  return (
    <>
      <h1 className="text-2xl text-center font-bold pt-4 text-purple-800">Hello T3itty</h1>
      {session?.user && <p>Logged is as:: <span className="bold">{session.user.name}</span></p>}
    </>
  )
}
