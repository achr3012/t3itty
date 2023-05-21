

import { getServerSession } from "next-auth"
import { AuthOptions } from "@/lib/AuthOptions"
import { Suspense } from "react";
import AddTweet from "./components/AddTweet";
import TweetsFeed from "./components/TweetsFeed";
import type { User } from "@prisma/client";
import { FaSpinner } from "react-icons/fa";

export const revalidate = 0;

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-52">
      <FaSpinner className="text-5xl animate-spin mb-3" />
      <p>Loading Teweets ...</p>
    </div>
  )
}
export default async function Home() {
  const session = await getServerSession(AuthOptions);
  const user = session?.user as User

  return (
    <>
      <AddTweet user={user} />
      <Suspense fallback={<LoadingSpinner />}>
        {/* @ts-expect-error Async Server Component */}
        <TweetsFeed />
      </Suspense>
    </>
  )
}
