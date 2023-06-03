import { getServerSession } from "next-auth"
import { AuthOptions } from "@/lib/AuthOptions"
import AddTweet from "./components/AddTweet";
import TweetsFeed from "./components/TweetsFeed";
import type { User } from "@prisma/client";

export const revalidate = 0;

export default async function Home() {
  const session = await getServerSession(AuthOptions);
  const user = session?.user as User
  const userId = session?.user ? user.id : null

  return (
    <>
      <AddTweet user={user} />
      <TweetsFeed userId={userId} />
    </>
  )
}
