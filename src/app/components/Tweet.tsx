import Avatar from "./Avatar";
import LikeTweet from "./LikeTweet";
import Link from "next/link";
import timeAgo from "@/lib/timeAgo";
import { Suspense } from "react";

export type TweetType = {
  user: {
    image: string | null;
    name: string | null;
    id: string;
  };
  _count: {
    likes: number;
  };
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export default function Tweet({ tweet, userId }: { tweet: TweetType, userId: string | null }) {

  const date = timeAgo(new Date(tweet.createdAt))

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
      <Suspense fallback={<p>Loading likes</p>}>
        <LikeTweet tweetId={tweet.id} userId={userId} likes={tweet._count.likes} />
      </Suspense>
    </div>
  )
}
