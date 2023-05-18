import fetchTweets, { likeExists } from "@/lib/fetchTweets"
import Avatar from "./Avatar"
import Link from "next/link"
import LikeTweet from "./LikeTweet";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/AuthOptions";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const tweetDateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false
}; // Options for formatting the date

const TweetsFeed = async () => {
  const session = await getServerSession(AuthOptions);
  const user = session?.user as User
  const userId = session?.user ? user.id : null

  const tweets = await fetchTweets()

  if (tweets.length == 0) {
    return <h1 className="text-3xl py-5">No Tweets to show :( Try to add some.</h1>
  }

  return (
    <div className="flex flex-col gap-5 px-2 py-8">
      {tweets.map(async (tweet) => {
        const date = new Intl.DateTimeFormat('en-US', tweetDateOptions).format(tweet.createdAt);
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