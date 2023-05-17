import { AuthOptions } from "@/lib/AuthOptions"
import { getServerSession } from "next-auth"
import AddTweet from "./components/AddTweet";
import { User } from "@prisma/client";
import TweetsFeed from "./components/TweetsFeed";

export default async function Home() {
  const session = await getServerSession(AuthOptions);
  const user = session?.user as User
  return (
    <>
      <AddTweet user={user} />
      {/* @ts-expect-error Async Server Component */}
      <TweetsFeed />
    </>
  )
}
