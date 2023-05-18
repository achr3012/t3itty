

import { getServerSession } from "next-auth"
import { AuthOptions } from "@/lib/AuthOptions"
import { Suspense } from "react";
import AddTweet from "./components/AddTweet";
import TweetsFeed from "./components/TweetsFeed";
import type { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;
export default async function Home() {
  const session = await getServerSession(AuthOptions);
  const user = session?.user as User

  return (
    <>
      <AddTweet user={user} />
      <Suspense fallback={<h1>Loading Tweets</h1>}>
        {/* @ts-expect-error Async Server Component */}
        <TweetsFeed />
      </Suspense>
    </>
  )
}
