import fetchTweets, { likeExists } from "@/lib/fetchTweets"
import Avatar from "./Avatar"
import Link from "next/link"
import LikeTweet from "./LikeTweet";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/AuthOptions";
import type { User } from "@prisma/client";
import timeAgo from "@/lib/timeAgo";

const TweetsFeed = async () => {
  const tweets = await fetchTweets()

  if (!tweets) return <h1 className="text-3xl py-5">No Tweets to show :( Try to add some.</h1>

  const session = await getServerSession(AuthOptions);
  const user = session?.user as User
  const userId = session?.user ? user.id : null


  return (
    <div className="flex flex-col gap-5 px-2 py-8 sm:px-0">
      {tweets.map(async (tweet) => {
        const date = timeAgo(tweet.createdAt)
        var liked = false
        if (userId && await likeExists({ tweetId: tweet.id, userId })) {
          liked = true
        }
        return (
          <div key={tweet.id} className="flex flex-col px-2 py-4 shadow-md border border-opacity-5 border-slate-700">
            <div className="flex gap-3 items-center">
              <Avatar href={tweet.userId} src={tweet.user.image} alt={tweet.user.name} />
              <Link href={`/profile/${tweet.userId}`}
                className="hover:underline font-semibold">
                {tweet.user.name}
              </Link>
              <span className="ml-auto text-gray-500 text-xs">{date}</span>
            </div>
            <div className="flex-grow">
              <p className="p-2 leading-relaxed whitespace-pre-wrap">{tweet.content}</p>
            </div>
            <LikeTweet tweetId={tweet.id} userId={userId} likes={tweet._count.likes} liked={liked} />
          </div>
        )
      })}
    </div >
  )
}


export default TweetsFeed