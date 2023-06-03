"use client"

import useSWR from 'swr';
import Tweet, { TweetType } from "./Tweet";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from 'react';
import fetcher from '@/lib/fetcher';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-52">
      <FaSpinner className="text-5xl animate-spin mb-3" />
      <p>Loading Teweets ...</p>
    </div>
  )
}

const TweetsFeed = ({ userId }: { userId: string | null }) => {
  const [tweets, setTweets] = useState<TweetType[]>()
  const { data, isLoading, error } = useSWR<TweetType[]>('/api/tweets', fetcher);

  useEffect(() => {
    if (!isLoading && data) {
      setTweets(data)
    }
  }, [data])

  if (error) return <div>failed to load</div>

  if (isLoading) return <LoadingSpinner />

  if (!data) return <h1 className='text-4xl text-center'>No Tweets found</h1>

  return (
    <div className="flex flex-col gap-5 px-2 py-8 sm:px-0">
      {tweets && tweets.map(tweet => {
        // return <p>{tweet.content}</p>
        return <Tweet key={tweet.id} tweet={tweet} userId={userId} />
      })}
    </div>
  )
}
export default TweetsFeed